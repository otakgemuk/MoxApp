/**
 * DiscountBadge.tsx
 * 
 * React component that displays discount information with proper styling and patterns.
 * Handles single discounts, split discounts (eval + setup), tiered discounts, and no-discount scenarios.
 * 
 * Usage in a table cell:
 *   <DiscountBadges plan={row.original} />
 */

import React, { useState } from 'react';
import {
  analyzeDiscountPattern,
  getDiscountBadgeClasses,
  type DiscountBadge as DiscountBadgeType,
} from '../lib/discountUtils';
import type { DiscountTier } from '../hooks/usePlans';

interface DiscountBadgesProps {
  plan: {
    eval_fee: number;
    activation_fee: number;
    active_discount_pct: number;
    firm_name: string;
    account_type: string;
    total_cost_to_funded: number;
    discount_tiers?: DiscountTier[] | null;
  };
  compact?: boolean; // If true, show only on hover
  showDescription?: boolean; // If true, add small helper text
}

/**
 * Tiered discount display component
 * Shows multiple discount tiers that apply sequentially
 */
const TieredDiscountBadge: React.FC<{ tiers: DiscountTier[] }> = ({ tiers }) => {
  const [expanded, setExpanded] = useState(false);
  const sortedTiers = [...tiers].sort((a, b) => a.tier - b.tier);

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => setExpanded(!expanded)}
        className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition px-2 py-1 text-xs font-medium cursor-pointer"
      >
        <span>📊 Tiered Discount</span>
        <span className="text-[10px]">{expanded ? '−' : '+'}</span>
      </button>
      {expanded && (
        <div className="rounded-lg bg-blue-500/10 border border-blue-500/30 p-2 space-y-1">
          {sortedTiers.map((tier) => (
            <div key={tier.tier} className="flex justify-between items-center text-xs">
              <span className="text-blue-200">{tier.label}</span>
              <span className="font-semibold text-blue-400">−{tier.pct}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Main component: DiscountBadges
 * Renders discount information in badge format
 */
export const DiscountBadges: React.FC<DiscountBadgesProps> = ({
  plan,
  compact = false,
  showDescription = false,
}) => {
  // Check for tiered discount first
  if (plan.discount_tiers && plan.discount_tiers.length > 0) {
    return <TieredDiscountBadge tiers={plan.discount_tiers} />;
  }

  const pattern = analyzeDiscountPattern(plan);

  // No discount case
  if (pattern.type === 'none') {
    return (
      <div className="flex flex-col gap-1">
        <span className={getDiscountBadgeClasses(pattern.badges[0])}>
          {pattern.badges[0].label}
        </span>
        {showDescription && (
          <span className="text-xs text-gray-500 italic">{pattern.description}</span>
        )}
      </div>
    );
  }

  // Split discount case (e.g., NexGen: -80% eval, -50% setup)
  if (pattern.type === 'split') {
    return (
      <div className={`flex flex-col gap-2 ${compact ? 'hover:opacity-100 opacity-50' : ''}`}>
        {pattern.badges.map((badge, idx) => (
          <SingleBadge key={idx} badge={badge} />
        ))}
        {showDescription && (
          <span className="text-xs text-gray-500 italic">{pattern.description}</span>
        )}
      </div>
    );
  }

  // Simple discount case
  if (pattern.type === 'simple') {
    return (
      <div className="flex flex-col gap-1">
        <SingleBadge badge={pattern.badges[0]} />
        {showDescription && (
          <span className="text-xs text-gray-500 italic">{pattern.description}</span>
        )}
      </div>
    );
  }

  return null;
};

/**
 * Sub-component: SingleBadge
 * Renders a single discount badge with proper styling
 */
interface SingleBadgeProps {
  badge: DiscountBadgeType;
}

const SingleBadge: React.FC<SingleBadgeProps> = ({ badge }) => {
  return (
    <span className={getDiscountBadgeClasses(badge)}>
      {badge.label}
    </span>
  );
};

/**
 * Enhanced cell component for use in TanStack Table
 * Replaces the "After Discount" column with this new component
 * 
 * Usage in PlanTable.tsx:
 * 
 *   // Replace the current "After Discount" column with:
 *   columnHelper.accessor("active_discount_pct", {
 *     id: "discount_display",
 *     header: "Discount",
 *     cell: (info) => <DiscountBadges plan={info.row.original} />,
 *     size: 160,
 *   }),
 */
export const DiscountBadgesTableCell: React.FC<{ plan: DiscountBadgesProps['plan'] }> = ({
  plan,
}) => {
  return <DiscountBadges plan={plan} />;
};

/**
 * Tooltip/Popover component for detailed discount breakdown
 * Shows exactly how the discount was calculated
 * 
 * Usage:
 *   <DiscountTooltip plan={plan} />
 */
import { calculateDiscountBreakdown } from '../lib/discountUtils';

interface DiscountTooltipProps {
  plan: DiscountBadgesProps['plan'];
}

export const DiscountTooltip: React.FC<DiscountTooltipProps> = ({ plan }) => {
  const breakdown = calculateDiscountBreakdown(plan);

  // For split discounts (NexGen case with separate eval/setup)
  if ('evalBefore' in breakdown && breakdown.evalBefore !== undefined && 'setupBefore' in breakdown && breakdown.setupBefore !== undefined) {
    return (
      <div className="rounded-lg bg-slate-900 p-3 text-xs text-gray-300 space-y-2 border border-slate-700">
        <div className="text-sm font-semibold text-white mb-2">Discount Breakdown</div>

        <div className="space-y-1 border-b border-slate-700 pb-2">
          <div className="flex justify-between">
            <span>Eval Fee:</span>
            <span className="text-gray-400">${(breakdown as any).evalBefore.toFixed(0)}</span>
          </div>
          <div className="flex justify-between text-green-400">
            <span>After -80%:</span>
            <span>${(breakdown as any).evalAfter.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-green-500 text-[10px]">
            <span>Save:</span>
            <span>${(breakdown as any).evalSavings.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-1 border-b border-slate-700 pb-2">
          <div className="flex justify-between">
            <span>Setup Fee:</span>
            <span className="text-gray-400">${(breakdown as any).setupBefore.toFixed(0)}</span>
          </div>
          <div className="flex justify-between text-green-400">
            <span>After -50%:</span>
            <span>${(breakdown as any).setupAfter.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-green-500 text-[10px]">
            <span>Save:</span>
            <span>${(breakdown as any).setupSavings.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-1 pt-2 border-t border-slate-700">
          <div className="flex justify-between font-semibold text-white">
            <span>Total:</span>
            <span className="text-blue-300">${(breakdown as any).totalAfter.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-emerald-400 text-[10px]">
            <span>Total Savings:</span>
            <span>${(breakdown as any).totalSavings.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  }

  // For simple discounts
  return (
    <div className="rounded-lg bg-slate-900 p-3 text-xs text-gray-300 space-y-2 border border-slate-700">
      <div className="text-sm font-semibold text-white mb-2">Discount Applied</div>
      <div className="flex justify-between">
        <span>Original Cost:</span>
        <span className="text-gray-400">${(breakdown as any).costBefore.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-green-400">
        <span>Your Price:</span>
        <span>${(breakdown as any).costAfter.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-emerald-400 text-[10px]">
        <span>You Save:</span>
        <span>${(breakdown as any).savings.toFixed(2)}</span>
      </div>
    </div>
  );
};
