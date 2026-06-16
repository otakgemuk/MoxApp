#!/usr/bin/env python3
"""One-shot, idempotent patch: MyFundedFutures Flex correction.
- Remove the spurious '50K Flex (DD 1K)' plan (plan_id myfundedfutures-50000-flex-dd-1k).
- Set the two legitimate Flex plans (mffu-flex-25k $95, mffu-flex-50k $153) to 20%.
  total = eval_fee * (1 - 0.20).  activation_fee is 0 for all MFF.
Touches ONLY myfundedfutures Flex rows / the removed id. Re-running -> no diff.
"""
import json
from decimal import Decimal, ROUND_HALF_UP

def r2(x):
    return float(Decimal(str(x)).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP))

REMOVE_IDS = {'myfundedfutures-50000-flex-dd-1k'}
FLEX_DISC = 20
FILES = ['data/plans.json', 'frontend/public/plans.json', 'frontend/data.json']

for path in FILES:
    with open(path, encoding='utf-8') as f:
        plans = json.load(f)
    pre_count = len(plans)

    plans = [p for p in plans if p.get('plan_id') not in REMOVE_IDS]
    removed = pre_count - len(plans)

    flex_changed = 0
    for p in plans:
        if p.get('firm_id') == 'myfundedfutures' and p.get('account_type') == 'Flex':
            total = r2(p['eval_fee'] * (1 - FLEX_DISC / 100))
            if p.get('active_discount_pct') != FLEX_DISC or abs(p.get('total_cost_to_funded', -1) - total) > 0.011:
                p['active_discount_pct'] = FLEX_DISC
                p['has_discount'] = 1
                p['total_cost_to_funded'] = total
                flex_changed += 1

    flex = [p for p in plans if p.get('firm_id') == 'myfundedfutures' and p.get('account_type') == 'Flex']
    assert len(flex) == 2, f"expected 2 MFF Flex plans, got {len(flex)} in {path}"
    assert all(p.get('plan_id') not in REMOVE_IDS for p in plans), f"removal failed in {path}"
    assert removed <= 1, f"removed {removed} (>1) in {path}"
    for p in flex:
        assert p['active_discount_pct'] == FLEX_DISC, f"flex disc wrong {p['plan_id']} in {path}"
        assert abs(p['total_cost_to_funded'] - r2(p['eval_fee'] * 0.8)) <= 0.011, f"flex total wrong {p['plan_id']} in {path}"

    out = json.dumps(plans, indent=2, ensure_ascii=False) + "\n"
    json.loads(out)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(out)
    print(f"{path}: removed {removed}, flex_changed {flex_changed}, total now {len(plans)}")

print("OK")
