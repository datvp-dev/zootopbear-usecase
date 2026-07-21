from __future__ import annotations

import json
import re
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET


NS_MAIN = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
NS_REL = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"


def xml(zf, name):
    with zf.open(name) as f:
        return ET.parse(f).getroot()


def strings(zf):
    if "xl/sharedStrings.xml" not in zf.namelist():
        return []
    root = xml(zf, "xl/sharedStrings.xml")
    out = []
    for si in root.findall(f"{NS_MAIN}si"):
        out.append("".join(t.text or "" for t in si.iter(f"{NS_MAIN}t")))
    return out


def sheets(zf):
    wb = xml(zf, "xl/workbook.xml")
    rels = xml(zf, "xl/_rels/workbook.xml.rels")
    rel_map = {}
    for rel in rels:
        target = rel.attrib.get("Target", "")
        path = target.lstrip("/") if target.startswith("/") else "xl/" + target
        rel_map[rel.attrib.get("Id")] = path
    out = []
    for sheet in wb.find(f"{NS_MAIN}sheets").findall(f"{NS_MAIN}sheet"):
        out.append({
            "name": sheet.attrib.get("name"),
            "path": rel_map.get(sheet.attrib.get(f"{NS_REL}id")),
        })
    return out


def col(ref):
    return re.sub(r"[0-9]", "", ref)


def row_num(ref):
    digits = re.sub(r"[^0-9]", "", ref)
    return int(digits or 0)


def value(cell, sst):
    f = cell.find(f"{NS_MAIN}f")
    v = cell.find(f"{NS_MAIN}v")
    inline = cell.find(f"{NS_MAIN}is")
    if f is not None:
        cached = v.text if v is not None else ""
        return "=" + (f.text or "") + ((" -> " + cached) if cached else "")
    if v is not None:
        raw = v.text or ""
        if cell.attrib.get("t") == "s":
            try:
                raw = sst[int(raw)]
            except Exception:
                pass
        return raw
    if inline is not None:
        return "".join(t.text or "" for t in inline.iter(f"{NS_MAIN}t"))
    return ""


def short(text, n=180):
    text = str(text).replace("\n", " ")
    return text if len(text) <= n else text[: n - 3] + "..."


def inspect(zf, sheet, sst):
    info = {
        "name": sheet["name"],
        "max_row": 0,
        "max_col": 0,
        "headers": {},
        "formula_columns": {},
        "sample_values_row_2_to_5": [],
    }
    path = sheet["path"]
    with zf.open(path) as f:
        for _, elem in ET.iterparse(f, events=("end",)):
            if elem.tag != f"{NS_MAIN}c":
                continue
            ref = elem.attrib.get("r", "")
            r = row_num(ref)
            c = col(ref)
            info["max_row"] = max(info["max_row"], r)
            letters = re.sub(r"[^A-Z]", "", c)
            idx = 0
            for ch in letters:
                idx = idx * 26 + ord(ch) - 64
            info["max_col"] = max(info["max_col"], idx)
            text = value(elem, sst)
            if text and r <= 3:
                info["headers"].setdefault(c, short(text, 80))
            if text and 2 <= r <= 5:
                info["sample_values_row_2_to_5"].append({"cell": ref, "value": short(text, 80)})
            if text.startswith("="):
                bucket = info["formula_columns"].setdefault(c, {"count": 0, "examples": []})
                bucket["count"] += 1
                if len(bucket["examples"]) < 2:
                    bucket["examples"].append({"cell": ref, "formula": short(text, 260)})
            elem.clear()
    return info


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    result = []
    for arg in sys.argv[1:]:
        path = Path(arg)
        with zipfile.ZipFile(path) as zf:
            sst = strings(zf)
            result.append({
                "path": str(path),
                "sheets": [inspect(zf, sheet, sst) for sheet in sheets(zf)],
            })
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
