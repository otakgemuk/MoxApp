#!/usr/bin/env python3
"""One-shot fix: Take Profit Trader -> 5 Standard plans at 40% discount.
Recalculates total_cost_to_funded = (eval_fee + activation_fee) * 0.6
across all plans.json copies. Fails loudly if plan count or types are wrong.
"""
import json
import os
import sys

PATHS = [
    "data/plans.json",
    "frontend/public/plans.json",
    "frontend/data.json",
]


def patch(path):
    if not os.path.exists(path):
        print(f"skip {path} (missing)")
        return
    with open(path) as f:
        plans = json.load(f)
    tpt = [p for p in plans if p.get("firm_id") == "take_profit_trad"]
    assert len(tpt) == 5, f"{path}: expected 5 TPT plans, found {len(tpt)}"
    assert all(p.get("account_type") == "Standard" for p in tpt), (
        f"{path}: non-Standard TPT plan present"
    )
    for p in tpt:
        ev = p.get("eval_fee") or 0
        act = p.get("activation_fee") or 0
        p["active_discount_pct"] = 40
        p["has_discount"] = 1
        p["base_cost_to_funded"] = ev + act
        total = round((ev + act) * 0.6, 2)
        p["total_cost_to_funded"] = int(total) if total == int(total) else total
    with open(path, "w") as f:
        json.dump(plans, f, indent=2)
        f.write("\n")
    print(f"{path}: {len(plans)} plans, 5 TPT patched to 40%")
    for p in tpt:
        print("  ", p["plan_id"], "| eval", p["eval_fee"], "| total", p["total_cost_to_funded"])


if __name__ == "__main__":
    for path in PATHS:
        patch(path)
    print("done")
    sys.exit(0)
