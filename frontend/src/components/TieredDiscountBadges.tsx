// TieredDiscountBadges.tsx
//
// Display tiered/conditional discount structures
// e.g., "50% first 2 uses, then 30%"

import { useState } from 'react';

interface DiscountTier {
  tier: number;
  pct: number;
  limit: number | null;
  label: string;
}

interface TieredDiscountBadgesProps {
  tiers: DiscountTier[];
  currentDiscount: number;
}

export function TieredDiscountBadges({ tiers, currentDiscount }: TieredDiscountBadgesProps) {
  const [showDetails, setShowDetails] = useState(false);

  if (!tiers || tiers.length === 0) return null;

  // Sort by tier number
  const sortedTiers = [...tiers].sort((a, b) => a.tier - b.tier);

  // Build summary text
  const summary = sortedTiers
    .map((t) => `${t.pct}% ${t.label}`)
    .join(' → ');

  return (
    <div className="space-y-1">
      {/* Tooltip trigger */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="text-xs text-blue-400 underline hover:text-blue-300 transition"
      >
        📊 Tiered discount
      </button>

      {/* Tier details (collapsible) */}
      {showDetails && (
        <div className="rounded-lg bg-blue-500/10 border border-blue-500/30 p-2 mt-1 space-y-1">
          {sortedTiers.map((tier) => (
            <div key={tier.tier} className="text-xs text-blue-300 flex justify-between">
              <span>
                {tier.label}
              </span>
              <span className="font-semibold text-blue-400">
                -{tier.pct}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
