#!/usr/bin/env python3
"""One-shot, idempotent patch: MyFundedFutures Builder -> 50% (weekly promo).
total = eval_fee * (1 - 0.50). activation_fee is 0 for all MFF.
Touches ONLY myfundedfutures Builder rows. Re-running -> no diff.
"""
import json
from decimal import Decimal, ROUND_HALF_UP

def r2(x):
    return float(Decimal(str(x)).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP))

BUILDER_DISC = 50
FILES = ['data/plans.json', 'frontend/public/plans.json', 'frontend/data.json']

for path in FILES:
    with open(path, encoding='utf-8') as f:
        plans = json.load(f)
    pre_count = len(plans)
    builders = [p for p in plans if p.get('firm_id') == 'myfundedfutures' and p.get('account_type') == 'Builder']
    changed = 0
    for p in builders:
        total = r2(p['eval_fee'] * (1 - BUILDER_DISC / 100))
        if p.get('active_discount_pct') != BUILDER_DISC or abs(p.get('total_cost_to_funded', -1) - total) > 0.011:
            p['active_discount_pct'] = BUILDER_DISC
            p['has_discount'] = 1
            p['total_cost_to_funded'] = total
            changed += 1
    assert len(plans) == pre_count, f"COUNT CHANGED in {path}"
    assert len(builders) == 2, f"expected 2 MFF Builder plans, got {len(builders)} in {path}"
    for p in builders:
        assert p['active_discount_pct'] == BUILDER_DISC, f"disc wrong {p['plan_id']} in {path}"
        assert abs(p['total_cost_to_funded'] - r2(p['eval_fee'] * 0.5)) <= 0.011, f"total wrong {p['plan_id']} in {path}"
    out = json.dumps(plans, indent=2, ensure_ascii=False) + "\n"
    json.loads(out)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(out)
    print(f"{path}: builders {len(builders)}, changed {changed}, total {len(plans)}")

print("OK")
