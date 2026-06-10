#!/usr/bin/env python3
"""One-shot fix: set null consistency_eval / consistency_funded to 0
across all plans.json copies. 0 = no consistency rule (displays as 0%).
Does not touch any other field. Plan counts must remain unchanged.
"""
import json
import os

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
    before = len(plans)
    n_eval = 0
    n_funded = 0
    for p in plans:
        if p.get("consistency_eval") is None:
            p["consistency_eval"] = 0
            n_eval += 1
        if p.get("consistency_funded") is None:
            p["consistency_funded"] = 0
            n_funded += 1
    assert len(plans) == before, f"{path}: plan count changed!"
    remaining = [
        p["plan_id"] for p in plans
        if p.get("consistency_eval") is None or p.get("consistency_funded") is None
    ]
    assert not remaining, f"{path}: nulls remain: {remaining}"
    with open(path, "w") as f:
        json.dump(plans, f, indent=2)
        f.write("\n")
    print(f"{path}: {before} plans | cons_eval null->0: {n_eval} | cons_funded null->0: {n_funded}")


if __name__ == "__main__":
    for path in PATHS:
        patch(path)
    print("done")
