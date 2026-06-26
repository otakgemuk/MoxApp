# MoxApp Filter & Sort Fixes — Complete Audit

**Date:** June 26, 2026  
**Status:** ✅ ALL ISSUES RESOLVED

---

## Issues Found & Fixed

### 1. ❌ Eval Cost Column Not Sorting by Discounted Price
**Commit:** `7c3f19e`
- **Problem:** Eval Cost column sorted by base fee, not discounted price
- **Impact:** With 90% discount, Apex still appeared high instead of lowest
- **Fix:** Added custom `sortingFn` that calculates `eval_fee * (1 - discount/100)`
- **Result:** ✅ Now sorts correctly: Apex $19.90 shows as lowest

### 2. ❌ Price After Discount Column Not Sorting
**Commit:** `a43e8a4`
- **Problem:** Price After Discount column was missing custom sort function
- **Impact:** Sorting by this column didn't match displayed values
- **Fix:** Added `sortingFn` matching Eval Cost logic
- **Result:** ✅ Now Bulenox $15.95 shows as lowest when sorted

### 3. ❌ Sort Buttons Non-Functional When Filters Applied
**Commit:** `8a1bee6`
- **Problem:** Clicking account size filter broke all sort buttons
- **Impact:** Users couldn't sort filtered results
- **Fix:** 
  - Pass current `sortValue` to PlanTable as `serverSorting` prop
  - Added `useEffect` to sync prop changes to local state
- **Result:** ✅ Sort buttons work with all filters applied

### 4. ❌ Null Values in profit_split & trustpilot
**Commit:** `e36d41e`
- **Problem:** 128 plans missing profit_split, 110 plans missing trustpilot
- **Impact:** Sorting by these fields could fail with null errors
- **Fix:** Added null coalescing in SORT_KEYS:
  - `profit_split ?? -1` (sorts nulls to bottom)
  - `trustpilot ?? 0` (sorts nulls to bottom)
- **Result:** ✅ All sort options now handle missing data gracefully

---

## Filter & Sort Combinations Tested ✅

### Account Size Filters
- ✅ All (224 plans)
- ✅ 25K (36 plans)
- ✅ 50K (63 plans)
- ✅ 100K (54 plans)
- ✅ 150K (47 plans)
- ✅ 250K+ (10 plans)

### Drawdown Type Filters
- ✅ EOD (151 plans)
- ✅ Trailing (17 plans)
- ✅ Static (21 plans)
- ✅ Intraday (34 plans)

### Sort Options (All Working)
- ✅ Total Cost ↑ / ↓
- ✅ Eval Fee ↑ / ↓
- ✅ Profit Split ↑ / ↓
- ✅ Trustpilot ↓

### Combined Filters + Sorts
- ✅ Account Size + Any Sort = Functional
- ✅ Drawdown + Any Sort = Functional
- ✅ Size + Drawdown + Any Sort = Functional
- ✅ All 4 drawdown types with all sorts = Functional

---

## Files Modified

```
frontend/src/App.tsx
  → Pass serverSorting prop to PlanTable
  
frontend/src/components/PlanTable.tsx
  → Add useEffect to sync serverSorting changes
  → Add custom sortingFn to Eval Cost column
  → Add custom sortingFn to Price After Discount column
  
frontend/src/hooks/usePlans.ts
  → Fix null handling: profit_split ?? -1
  → Fix null handling: trustpilot ?? 0
```

---

## Commits Applied

1. `7c3f19e` — Fix Eval Cost sorting to use price after discount
2. `a43e8a4` — Add sortingFn to Price After Discount column
3. `8a1bee6` — Fix sorting non-functional when filters applied
4. `e36d41e` — Fix null handling in profit_split and trustpilot sorts

---

## Testing Performed

✅ Account Size button clicks → Sort buttons functional  
✅ Drawdown type selection → All sorts work  
✅ Clicking "Price After Discount" → Bulenox at $15.95 shows first  
✅ Clicking "Eval Cost" → Apex at $19.90 shows first  
✅ Multiple filter combinations → No broken interactions  
✅ Null value handling → No console errors  

---

## Deployment Status

✅ **READY FOR PRODUCTION**

All button interactions tested and functional. No remaining issues detected.

