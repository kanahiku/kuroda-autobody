#!/usr/bin/env python3
"""
Regenerate src/data/sitemap.ts from the client Sitemap workbook.

Usage:
    python3 scripts/gen-sitemap.py "/path/to/Kuroda_Auto_Body_Sitemap_Content_Plan_V2.xlsx"

Reads the "Sitemap" sheet columns:
    Category · Category slug
    Sub category one · Sub category one slug
    Sub category two · Sub category two slug
    Batch

Rows with an empty Category belong to the previous category; rows with an empty
"Sub category one" but a "Sub category two" belong to the previous sub category one.
Requires: pip install openpyxl
"""
import json
import sys
from pathlib import Path

import openpyxl

SRC = sys.argv[1] if len(sys.argv) > 1 else None
if not SRC:
    sys.exit(__doc__)

OUT = Path(__file__).resolve().parent.parent / 'src' / 'data' / 'sitemap.ts'

ws = openpyxl.load_workbook(SRC, data_only=True)['Sitemap']
rows = list(ws.iter_rows(values_only=True))
header_idx = next(i for i, r in enumerate(rows) if r and r[0] == 'Category')


def clean(v):
    return v.strip() if isinstance(v, str) and v.strip() else None


def node(label, slug, batch):
    n = {'label': label}
    if slug:
        n['slug'] = slug
    if batch:
        n['batch'] = batch
    return n


tree = []
cat = sub1 = None
for r in rows[header_idx + 1 :]:
    c, cs, s1, s1s, s2, s2s, batch = (clean(x) for x in r[:7])
    if c:
        cat = node(c, cs, batch)
        tree.append(cat)
        sub1 = None
    elif s1:
        sub1 = node(s1, s1s, batch)
        cat.setdefault('children', []).append(sub1)
    elif s2:
        sub1.setdefault('children', []).append(node(s2, s2s, batch))


def ts(value, indent=0):
    pad = '  ' * indent
    if isinstance(value, list):
        if not value:
            return '[]'
        return '[\n' + ''.join(f'{pad}  {ts(v, indent + 1)},\n' for v in value) + f'{pad}]'
    if isinstance(value, dict):
        parts = []
        for k, v in value.items():
            parts.append(f'{k}: {ts(v, indent + 1)}')
        inline = '{ ' + ', '.join(parts) + ' }'
        if 'children' not in value and len(inline) < 120:
            return inline
        return '{\n' + ''.join(f'{pad}  {p},\n' for p in parts) + f'{pad}}}'
    return json.dumps(value, ensure_ascii=False).replace('"', "'") if isinstance(value, str) else json.dumps(value)


body = f"""/**
 * Site map — GENERATED from the client workbook (Sitemap sheet). Do not edit by hand.
 * Regenerate: python3 scripts/gen-sitemap.py "<path to .xlsx>"
 *
 * Hierarchy (one level per spreadsheet column pair):
 *   Category (slug)  →  Sub category one (slug)  →  Sub category two (slug)
 * A node without `slug` is a grouping label only (no page).
 */
export interface SitemapNode {{
  label: string;
  /** Route, e.g. `/collision-repair/`. Absent = nav/footer grouping only. */
  slug?: string;
  /** Workbook batch: Approved · Batch 1 · Batch 2 (on hold) · Batch 3 · Client / legal. */
  batch?: string;
  children?: SitemapNode[];
}}

export const sitemap: SitemapNode[] = {ts(tree)};
"""
OUT.write_text(body, encoding='utf-8')
print(f'wrote {OUT} ({len(tree)} categories)')
