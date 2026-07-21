from __future__ import annotations

import json
import re
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET


NS_MAIN = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
NS_REL = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
NS_PKG_REL = "{http://schemas.openxmlformats.org/package/2006/relationships}"


def read_xml(zf: zipfile.ZipFile, name: str):
    with zf.open(name) as f:
        return ET.parse(f).getroot()


def shared_strings(zf: zipfile.ZipFile):
    if "xl/sharedStrings.xml" not in zf.namelist():
        return []
    root = read_xml(zf, "xl/sharedStrings.xml")
    strings = []
    for si in root.findall(f"{NS_MAIN}si"):
        parts = []
        for t in si.iter(f"{NS_MAIN}t"):
            parts.append(t.text or "")
        strings.append("".join(parts))
    return strings


def workbook_sheets(zf: zipfile.ZipFile):
    wb = read_xml(zf, "xl/workbook.xml")
    rels = read_xml(zf, "xl/_rels/workbook.xml.rels")
    rel_map = {}
    for rel in rels:
        rel_id = rel.attrib.get("Id")
        target = rel.attrib.get("Target", "")
        if target.startswith("/"):
            path = target.lstrip("/")
        else:
            path = "xl/" + target
        rel_map[rel_id] = path

    sheets = []
    sheets_node = wb.find(f"{NS_MAIN}sheets")
    if sheets_node is None:
        return sheets
    for sheet in sheets_node.findall(f"{NS_MAIN}sheet"):
        name = sheet.attrib.get("name")
        rel_id = sheet.attrib.get(f"{NS_REL}id")
        sheets.append({"name": name, "path": rel_map.get(rel_id)})
    return sheets


def col_index(cell_ref: str):
    letters = re.sub(r"[^A-Z]", "", cell_ref.upper())
    total = 0
    for ch in letters:
        total = total * 26 + (ord(ch) - ord("A") + 1)
    return total


def row_index(cell_ref: str):
    digits = re.sub(r"[^0-9]", "", cell_ref)
    return int(digits or 0)


def cell_value(cell, sst):
    formula = cell.find(f"{NS_MAIN}f")
    value = cell.find(f"{NS_MAIN}v")
    inline = cell.find(f"{NS_MAIN}is")
    text = ""
    if formula is not None:
        text = "=" + (formula.text or "")
    if value is not None:
        raw = value.text or ""
        if cell.attrib.get("t") == "s":
            try:
                raw = sst[int(raw)]
            except Exception:
                pass
        if text:
            text += " -> "
        text += raw
    if inline is not None:
        parts = [t.text or "" for t in inline.iter(f"{NS_MAIN}t")]
        if text:
            text += " -> "
        text += "".join(parts)
    return text


def compact(text, limit=220):
    text = str(text).replace("\n", " ").replace("\r", " ")
    return text if len(text) <= limit else text[: limit - 3] + "..."


def inspect_sheet(zf: zipfile.ZipFile, sheet, sst, row_limit=12):
    path = sheet["path"]
    result = {
        "name": sheet["name"],
        "path": path,
        "dimension": "",
        "sample_rows": [],
        "formula_columns": {},
        "formula_total_in_scan": 0,
        "max_seen_row": 0,
        "max_seen_col": 0,
        "used_columns_first_rows": {},
    }
    if not path or path not in zf.namelist():
        result["error"] = "sheet xml not found"
        return result

    with zf.open(path) as f:
        context = ET.iterparse(f, events=("start", "end"))
        current_row = None
        current_values = []
        for event, elem in context:
            if event == "start" and elem.tag == f"{NS_MAIN}dimension":
                result["dimension"] = elem.attrib.get("ref", "")
            elif event == "start" and elem.tag == f"{NS_MAIN}row":
                current_row = int(elem.attrib.get("r", "0"))
                current_values = []
            elif event == "end" and elem.tag == f"{NS_MAIN}c":
                ref = elem.attrib.get("r", "")
                text = cell_value(elem, sst)
                if text:
                    result["max_seen_row"] = max(result["max_seen_row"], row_index(ref))
                    result["max_seen_col"] = max(result["max_seen_col"], col_index(ref))
                    if current_row and current_row <= row_limit:
                        current_values.append({"cell": ref, "value": compact(text, 120)})
                        result["used_columns_first_rows"].setdefault(re.sub(r"[0-9]", "", ref), compact(text, 90))
                    if text.startswith("="):
                        result["formula_total_in_scan"] += 1
                        col = re.sub(r"[0-9]", "", ref)
                        bucket = result["formula_columns"].setdefault(col, {"count": 0, "examples": []})
                        bucket["count"] += 1
                        if len(bucket["examples"]) < 3:
                            bucket["examples"].append({"cell": ref, "formula": compact(text, 700)})
                elem.clear()
            elif event == "end" and elem.tag == f"{NS_MAIN}row":
                if current_row and current_row <= row_limit and current_values:
                    result["sample_rows"].append({"row": current_row, "cells": current_values[:40]})
                elem.clear()
    return result


def workbook_summary(path: Path):
    with zipfile.ZipFile(path) as zf:
        sst = shared_strings(zf)
        sheets = workbook_sheets(zf)
        return {
            "path": str(path),
            "sheets": [inspect_sheet(zf, sheet, sst) for sheet in sheets],
        }


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
    paths = [Path(arg) for arg in sys.argv[1:]]
    print(json.dumps([workbook_summary(path) for path in paths], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
