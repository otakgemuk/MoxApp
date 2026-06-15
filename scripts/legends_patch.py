#!/usr/bin/env python3
"""One-shot, idempotent Legends Trading pricing patch.
Elite -> 30% discount (one-time: total = eval * (1-d)).
Apprentice -> 50% discount (total = eval*(1-d) + activation).
Repairs frontend/data.json drift back to canonical base fees.
Re-running produces no diff. Touches ONLY legends_trading rows.
"""
import json, sys
from decimal import Decimal, ROUND_HALF_UP

def r2(x):
    return float(Decimal(str(x)).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP))

CANON = {
 'legends-trading-25000-elite':       dict(eval_fee=148.75, activation_fee=0,   disc=30, otype='elite'),
 'legends-trading-50000-elite':       dict(eval_fee=188.75, activation_fee=0,   disc=30, otype='elite'),
 'legends-trading-100000-elite':      dict(eval_fee=283.75, activation_fee=0,   disc=30, otype='elite'),
 'legends-trading-150000-elite':      dict(eval_fee=347.00, activation_fee=0,   disc=30, otype='elite'),
 'legends-trading-50000-apprentice':  dict(eval_fee=118.0,  activation_fee=99,  disc=50, otype='appr'),
 'legends-trading-100000-apprentice': dict(eval_fee=214.0,  activation_fee=129, disc=50, otype='appr'),
 'legends-trading-150000-apprentice': dict(eval_fee=276.0,  activation_fee=149, disc=50, otype='appr'),
}

def compute(c):
    ev, act, d = c['eval_fee'], c['activation_fee'], c['disc']
    base = ev + act
    total = ev*(1-d/100) if c['otype']=='elite' else ev*(1-d/100)+act
    return base, r2(total)

FILES = ['data/plans.json', 'frontend/public/plans.json', 'frontend/data.json']

for path in FILES:
    with open(path, encoding='utf-8') as f:
        plans = json.load(f)
    pre_count = len(plans)
    pre_types = sorted({p['account_type'] for p in plans if p.get('firm_id')=='legends_trading'})
    repair_base = (path == 'frontend/data.json')
    touched = 0
    for p in plans:
        if p.get('firm_id') != 'legends_trading':
            continue
        c = CANON[p['plan_id']]
        base, total = compute(c)
        if repair_base:
            p['eval_fee'] = c['eval_fee']
            p['activation_fee'] = c['activation_fee']
        p['base_cost_to_funded'] = base
        p['active_discount_pct'] = c['disc']
        p['has_discount'] = 1
        p['total_cost_to_funded'] = total
        touched += 1
    assert len(plans) == pre_count, f"COUNT CHANGED in {path}"
    assert sorted({p['account_type'] for p in plans if p.get('firm_id')=='legends_trading'}) == pre_types, f"TYPES CHANGED {path}"
    assert touched == 7, f"expected 7 legends rows, touched {touched} in {path}"
    for p in plans:
        if p.get('firm_id') != 'legends_trading':
            continue
        c = CANON[p['plan_id']]; base, total = compute(c)
        assert p['total_cost_to_funded'] == total, f"total mismatch {p['plan_id']}"
        assert p['base_cost_to_funded'] == base, f"base mismatch {p['plan_id']}"
        assert p['active_discount_pct'] == c['disc'], f"disc mismatch {p['plan_id']}"
    out = json.dumps(plans, indent=2, ensure_ascii=False) + "\n"
    json.loads(out)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(out)
    print(f"patched {path}: {touched} legends rows, {pre_count} total entries")

print("OK")
