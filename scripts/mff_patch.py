#!/usr/bin/env python3
"""One-shot, idempotent MyFundedFutures discount patch.
Targets by account_type: Flex 40%, Builder 40%, Rapid 20%, Pro 30%.
All MFF plans: activation_fee 0 -> total = eval_fee * (1 - disc/100).
Only rows that are off-spec are modified (in-spec rows untouched, incl. float-ugly
totals that are already numerically correct). Touches ONLY myfundedfutures rows.
Re-running produces no diff.
"""
import json
from decimal import Decimal, ROUND_HALF_UP

def r2(x):
    return float(Decimal(str(x)).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP))

TARGET = {'Flex': 40, 'Builder': 40, 'Rapid': 20, 'Pro': 30}
FILES = ['data/plans.json', 'frontend/public/plans.json', 'frontend/data.json']

for path in FILES:
    with open(path, encoding='utf-8') as f:
        plans = json.load(f)
    pre_count = len(plans)
    mff = [p for p in plans if p.get('firm_id') == 'myfundedfutures']
    pre_types = sorted({p['account_type'] for p in mff})
    changed = 0
    for p in mff:
        t = p['account_type']
        if t not in TARGET:
            raise SystemExit(f"Unexpected MFF account_type '{t}' in {path}")
        want = TARGET[t]
        want_total = r2(p['eval_fee'] * (1 - want / 100))
        cur_total = p.get('total_cost_to_funded')
        in_spec = (p.get('active_discount_pct') == want
                   and cur_total is not None
                   and abs(cur_total - want_total) <= 0.011)
        if in_spec:
            continue
        p['active_discount_pct'] = want
        p['has_discount'] = 1 if want > 0 else 0
        p['total_cost_to_funded'] = want_total
        changed += 1
    assert len(plans) == pre_count, f"COUNT CHANGED in {path}"
    assert sorted({x['account_type'] for x in plans if x.get('firm_id')=='myfundedfutures'}) == pre_types, f"TYPES CHANGED {path}"
    for p in plans:
        if p.get('firm_id') != 'myfundedfutures':
            continue
        want = TARGET[p['account_type']]
        assert p['active_discount_pct'] == want, f"disc mismatch {p['plan_id']} in {path}"
        assert abs(p['total_cost_to_funded'] - r2(p['eval_fee'] * (1 - want/100))) <= 0.011, f"total mismatch {p['plan_id']} in {path}"
    out = json.dumps(plans, indent=2, ensure_ascii=False) + "\n"
    json.loads(out)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(out)
    print(f"{path}: {len(mff)} MFF rows, {changed} changed, {pre_count} total entries")

print("OK")
