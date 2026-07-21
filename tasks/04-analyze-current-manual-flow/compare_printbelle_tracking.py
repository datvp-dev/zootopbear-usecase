from __future__ import annotations

import json
import re
import sys
import zipfile
from collections import defaultdict
from pathlib import Path
from xml.etree import ElementTree as ET


NS_MAIN = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
NS_REL = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"


def xml(zf, name):
    with zf.open(name) as f:
        return ET.parse(f).getroot()


def shared_strings(zf):
    if "xl/sharedStrings.xml" not in zf.namelist():
        return []
    root = xml(zf, "xl/sharedStrings.xml")
    return ["".join(t.text or "" for t in si.iter(NS_MAIN + "t")) for si in root.findall(NS_MAIN + "si")]


def sheets(zf):
    wb = xml(zf, "xl/workbook.xml")
    rels = xml(zf, "xl/_rels/workbook.xml.rels")
    relmap = {}
    for rel in rels:
        target = rel.attrib["Target"]
        relmap[rel.attrib["Id"]] = target.lstrip("/") if target.startswith("/") else "xl/" + target
    return [(sh.attrib["name"], relmap[sh.attrib[NS_REL + "id"]]) for sh in wb.find(NS_MAIN + "sheets").findall(NS_MAIN + "sheet")]


def col(ref):
    return re.sub(r"[0-9]", "", ref)


def row(ref):
    return int(re.sub(r"[^0-9]", "", ref) or 0)


def value(cell, sst):
    v = cell.find(NS_MAIN + "v")
    inline = cell.find(NS_MAIN + "is")
    if v is not None:
        raw = v.text or ""
        if cell.attrib.get("t") == "s":
            try:
                return sst[int(raw)]
            except Exception:
                return raw
        return raw
    if inline is not None:
        return "".join(t.text or "" for t in inline.iter(NS_MAIN + "t"))
    return ""


def rows_from_first_sheet(path: Path):
    with zipfile.ZipFile(path) as zf:
        sst = shared_strings(zf)
        _, sheet_path = sheets(zf)[0]
        rows = defaultdict(dict)
        with zf.open(sheet_path) as f:
            for _, elem in ET.iterparse(f, events=("end",)):
                if elem.tag == NS_MAIN + "c":
                    ref = elem.attrib.get("r", "")
                    text = value(elem, sst)
                    if text:
                        rows[row(ref)][col(ref)] = text
                    elem.clear()
        headers = rows.get(1, {})
        data = []
        for r in sorted(k for k in rows if k != 1):
            data.append({headers.get(c, c): v for c, v in rows[r].items()})
        return data


def workbook_values(path: Path):
    values = defaultdict(set)
    with zipfile.ZipFile(path) as zf:
        sst = shared_strings(zf)
        for sheet_name, sheet_path in sheets(zf):
            with zf.open(sheet_path) as f:
                for _, elem in ET.iterparse(f, events=("end",)):
                    if elem.tag == NS_MAIN + "c":
                        text = value(elem, sst).strip()
                        if text:
                            values[text].add(sheet_name)
                        elem.clear()
    return values


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    tracking = Path(sys.argv[1])
    manual = Path(sys.argv[2])
    track_rows = rows_from_first_sheet(tracking)
    manual_values = workbook_values(manual)

    checks = []
    fields = ["TrackNo", "OrderNo", "OrderId", "ProductCode", "SellersItemSku", "SystemSku"]
    for item in track_rows:
        row_check = {field: item.get(field, "") for field in fields}
        for field in fields:
            val = item.get(field, "")
            row_check[field + "_found_in_manual_sheets"] = sorted(manual_values.get(val, []))
        checks.append(row_check)

    summary = {
        "tracking_rows": len(track_rows),
        "statuses": sorted(set(item.get("Status", "") for item in track_rows if item.get("Status", ""))),
        "carriers": sorted(set(item.get("LogisticsCompany", "") for item in track_rows if item.get("LogisticsCompany", ""))),
        "matched_counts": {
            field: sum(1 for item in checks if item.get(field + "_found_in_manual_sheets")) for field in fields
        },
        "sample_checks": checks[:15],
    }
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
