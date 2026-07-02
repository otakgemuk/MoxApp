/**
 * discountUtils.ts
 * 
 * Logic for detecting and categorizing discount patterns across different firms.
 * Handles: simple discounts, split discounts (eval + setup), variable discounts, and no discount.
 */

export interface DiscountPattern {
  type: 'none' | 'simple' | 'split' | 'variable';
  evalDiscount?: number;      // e.g., 80 for 80%
  setupDiscount?: number;     // e.g., 50 for 50%
  mainDiscount?: number;      // For simple/variable
  description: string;         // Human-readable explanation
  badges: DiscountBadge[];    // Array of badge data to render
}

export interface DiscountBadge {
  label: string;              // e.g., "-80% eval" or "-50% setup" or "-80% OFF"
  percentage: number;         // e.g., 80
  category: 'eval' | 'setup' | 'standard' | 'none';
  type: 'high' | 'moderate' | 'low' | 'none';
}

/**
 * Analyzes a single plan and returns its discount pattern
 * @param plan - The plan object from plans.json
 * @returns DiscountPattern with categorized discount info
 */
export function analyzeDiscountPattern(plan: {
  eval_fee: number;
  activation_fee: number;
  active_discount_pct: number;
  firm_name: string;
  account_type: string;
  total_cost_to_funded: number;
}): DiscountPattern {
  const { active_discount_pct, firm_name, account_type } = plan;

  // NO DISCOUNT
  if (active_discount_pct === 0) {
    return {
      type: 'none',
      description: 'Full price, no discount',
      badges: [
        {
          label: 'Full price',
          percentage: 0,
          category: 'none',
          type: 'none',
        },
      ],
    };
  }

  // NexGen evals: 80% off the eval fee; activation billed at full price.
  if (
    firm_name === 'NexGen ProTrader Funding' &&
    account_type === 'Evaluation' &&
    active_discount_pct === 80
  ) {
    return {
      type: 'split',
      evalDiscount: 80,
      setupDiscount: 0,
      description: 'Eval discounted 80%; activation at full price',
      badges: [
        {
          label: `-80% eval`,
          percentage: 80,
          category: 'eval',
          type: 'high',
        },
      ],
    };
  }

  // SIMPLE DISCOUNT (flat % applied to all fees)
  // Determine severity (high/moderate/low)
  let severityType: 'high' | 'moderate' | 'low' = 'low';
  if (active_discount_pct >= 80) {
    severityType = 'high';
  } else if (active_discount_pct >= 50) {
    severityType = 'moderate';
  }

  // Create label based on discount amount
  let label = `-${active_discount_pct}%`;
  if (active_discount_pct >= 80) {
    label += ' OFF';
  }

  return {
    type: 'simple',
    mainDiscount: active_discount_pct,
    description: `${active_discount_pct}% discount applied`,
    badges: [
      {
        label,
        percentage: active_discount_pct,
        category: 'standard',
        type: severityType,
      },
    ],
  };
}

/**
 * Calculates the breakdown of costs with discounts applied
 * Useful for detailed tooltips or expanded views
 */
export function calculateDiscountBreakdown(plan: {
  eval_fee: number;
  activation_fee: number;
  active_discount_pct: number;
  firm_name: string;
  account_type: string;
  total_cost_to_funded: number;
}) {
  const pattern = analyzeDiscountPattern(plan);

  if (pattern.type === 'split' && plan.firm_name === 'NexGen ProTrader Funding') {
    // Special handling for NexGen split discount
    const evalAfterDiscount = plan.eval_fee * (1 - (pattern.evalDiscount || 0) / 100);
    const setupAfterDiscount = plan.activation_fee * (1 - (pattern.setupDiscount || 0) / 100);

    return {
      evalBefore: plan.eval_fee,
      evalAfter: Math.round(evalAfterDiscount * 100) / 100,
      evalSavings: Math.round((plan.eval_fee - evalAfterDiscount) * 100) / 100,
      setupBefore: plan.activation_fee,
      setupAfter: Math.round(setupAfterDiscount * 100) / 100,
      setupSavings: Math.round((plan.activation_fee - setupAfterDiscount) * 100) / 100,
      totalBefore: plan.eval_fee + plan.activation_fee,
      totalAfter: plan.total_cost_to_funded,
      totalSavings: Math.round((plan.eval_fee + plan.activation_fee - plan.total_cost_to_funded) * 100) / 100,
    };
  }

  // Standard discount calculation
  const discountRate = (plan.active_discount_pct || 0) / 100;
  const costBefore = plan.eval_fee + plan.activation_fee;
  const costAfter = plan.total_cost_to_funded;
  const savings = costBefore - costAfter;

  return {
    costBefore,
    costAfter,
    savings: Math.round(savings * 100) / 100,
    discountRate,
  };
}

/**
 * Get Tailwind CSS classes for a discount badge
 */
export function getDiscountBadgeClasses(badge: DiscountBadge): string {
  const baseClasses = 'inline-block rounded px-2 py-1 text-xs font-semibold';

  const colorMap: Record<DiscountBadge['type'], Record<DiscountBadge['category'], string>> = {
    high: {
      eval: 'bg-blue-500/20 text-blue-300',
      setup: 'bg-emerald-500/20 text-emerald-300',
      standard: 'bg-blue-500/20 text-blue-300',
      none: 'bg-gray-500/20 text-gray-400',
    },
    moderate: {
      eval: 'bg-amber-500/20 text-amber-300',
      setup: 'bg-emerald-500/20 text-emerald-300',
      standard: 'bg-amber-500/20 text-amber-300',
      none: 'bg-gray-500/20 text-gray-400',
    },
    low: {
      eval: 'bg-yellow-500/20 text-yellow-300',
      setup: 'bg-green-500/20 text-green-300',
      standard: 'bg-yellow-500/20 text-yellow-300',
      none: 'bg-gray-500/20 text-gray-400',
    },
    none: {
      eval: 'bg-gray-500/20 text-gray-400',
      setup: 'bg-gray-500/20 text-gray-400',
      standard: 'bg-gray-500/20 text-gray-400',
      none: 'bg-gray-500/20 text-gray-400',
    },
  };

  const colorClasses = colorMap[badge.type]?.[badge.category] || colorMap.none.none;
  return `${baseClasses} ${colorClasses}`;
}

/**
 * Get the severity level of a discount for UI prioritization
 */
export function getDiscountSeverity(discount: number): 'high' | 'moderate' | 'low' {
  if (discount >= 80) return 'high';
  if (discount >= 50) return 'moderate';
  return 'low';
}
