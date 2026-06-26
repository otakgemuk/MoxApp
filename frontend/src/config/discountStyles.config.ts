/**
 * discountStyles.config.ts
 * 
 * Tailwind classes and style configuration for discount badge system.
 * Uses MightyOx brand colors and semantic color meanings.
 * 
 * Color System:
 * - Gold (#C9920A): Standard/moderate discounts
 * - Blue: High discounts (80%+)
 * - Green: Setup fee discounts / savings
 * - Gray: No discount / full price
 */

/**
 * Badge Style Configuration
 * Maps discount severity to Tailwind classes
 */
export const BADGE_STYLES = {
  // High discount (80%+) - Premium/best deal
  high: {
    standard: 'inline-block rounded px-2 py-1 text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30',
    eval: 'inline-block rounded px-2 py-1 text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30',
    setup: 'inline-block rounded px-2 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  },

  // Moderate discount (50-79%) - Good deal
  moderate: {
    standard: 'inline-block rounded px-2 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30',
    eval: 'inline-block rounded px-2 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30',
    setup: 'inline-block rounded px-2 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  },

  // Low discount (1-49%) - Okay deal
  low: {
    standard: 'inline-block rounded px-2 py-1 text-xs font-semibold bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    eval: 'inline-block rounded px-2 py-1 text-xs font-semibold bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    setup: 'inline-block rounded px-2 py-1 text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/30',
  },

  // No discount - Full price
  none: {
    standard: 'inline-block rounded px-2 py-1 text-xs font-semibold bg-gray-500/20 text-gray-400',
    eval: 'inline-block rounded px-2 py-1 text-xs font-semibold bg-gray-500/20 text-gray-400',
    setup: 'inline-block rounded px-2 py-1 text-xs font-semibold bg-gray-500/20 text-gray-400',
  },
} as const;

/**
 * Container styles for badges
 */
export const BADGE_CONTAINER_STYLES = {
  // Single badge
  single: 'flex flex-col gap-1',

  // Split badges (eval + setup)
  split: 'flex flex-col gap-2',

  // Compact (hidden until hover)
  compact: 'hover:opacity-100 opacity-50 transition-opacity duration-200',

  // With description/helper text
  withDescription: 'flex flex-col gap-2',
} as const;

/**
 * Description/helper text styles
 */
export const DESCRIPTION_STYLES = {
  default: 'text-xs text-gray-500 italic',
  emphasis: 'text-xs text-gray-400 font-medium',
} as const;

/**
 * Tooltip/popover styles
 */
export const TOOLTIP_STYLES = {
  container: 'rounded-lg bg-slate-900 p-3 text-xs text-gray-300 space-y-2 border border-slate-700 shadow-lg',
  title: 'text-sm font-semibold text-white mb-2',
  row: 'flex justify-between',
  label: 'text-gray-400',
  value: 'text-gray-300 font-medium',
  positive: 'text-emerald-400',
  highlight: 'text-blue-300 font-semibold',
  divider: 'border-b border-slate-700 pb-2',
  finalDivider: 'border-t border-slate-700 pt-2',
} as const;

/**
 * MightyOx Brand Color Integration
 * Maps discount types to brand color semantics
 */
export const BRAND_COLORS = {
  // Primary brand color - standard discounts
  gold: '#C9920A',

  // Semantic colors matching the ox eye system
  bullish: '#15803D',    // Green = profits/gains (RIGHT eye)
  bearish: '#CC2936',    // Red = losses/danger (LEFT eye)

  // Supporting colors
  dark: '#1A2540',       // Navy - backgrounds
  black: '#0D0D0D',      // Primary dark
} as const;

/**
 * CSS-in-JS fallback (if Tailwind not available)
 */
export const BADGE_INLINE_STYLES = {
  highBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 600,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    color: '#93c5fd',
    border: '1px solid rgba(59, 130, 246, 0.3)',
  } as React.CSSProperties,

  moderateBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 600,
    backgroundColor: 'rgba(217, 119, 6, 0.2)',
    color: '#fcd34d',
    border: '1px solid rgba(217, 119, 6, 0.3)',
  } as React.CSSProperties,

  lowBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 600,
    backgroundColor: 'rgba(234, 179, 8, 0.2)',
    color: '#fde047',
    border: '1px solid rgba(234, 179, 8, 0.3)',
  } as React.CSSProperties,

  noBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 600,
    backgroundColor: 'rgba(107, 114, 128, 0.2)',
    color: '#9ca3af',
  } as React.CSSProperties,

  setupBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 600,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    color: '#86efac',
    border: '1px solid rgba(16, 185, 129, 0.3)',
  } as React.CSSProperties,
} as const;

/**
 * Animation/transition classes for badge interactions
 */
export const ANIMATION_CLASSES = {
  // Fade in on hover
  fadeOnHover: 'opacity-50 hover:opacity-100 transition-opacity duration-200',

  // Pulse for new/updated badges
  pulse: 'animate-pulse',

  // Smooth color transition
  colorTransition: 'transition-colors duration-300',
} as const;

/**
 * Responsive behavior configurations
 */
export const RESPONSIVE_CONFIG = {
  // Hide on mobile, show on desktop
  desktopOnly: 'hidden md:flex',

  // Compact on mobile, full on desktop
  compactMobile: 'flex flex-col md:flex-row md:gap-2',

  // Stack on mobile
  stackMobile: 'flex flex-col gap-1 md:flex-row md:gap-2',
} as const;

/**
 * Integration guide for PlanTable.tsx
 * 
 * Step 1: Import the utility and component
 * ────────────────────────────────────────
 * import { DiscountBadges } from "../components/DiscountBadges";
 * import { analyzeDiscountPattern } from "../lib/discountUtils";
 * 
 * Step 2: Replace the "After Discount" column with "Discount" column
 * ───────────────────────────────────────────────────────────────────
 * // OLD:
 * columnHelper.accessor("eval_fee", {
 *   id: "after_discount",
 *   header: "After Discount",
 *   cell: (info) => { ... existing code ... },
 * }),
 * 
 * // NEW:
 * columnHelper.accessor("active_discount_pct", {
 *   id: "discount_display",
 *   header: "Discount",
 *   cell: (info) => <DiscountBadges plan={info.row.original} />,
 *   size: 160,
 * }),
 * 
 * Step 3: Verify sortability (if needed)
 * ──────────────────────────────────────
 * The Total column already sorts by total_cost_to_funded, which is the 
 * calculated value after discounts. No changes needed.
 * 
 * Step 4: Test with different firms
 * ──────────────────────────────────
 * - NexGen: Shows split badges (-80% eval, -50% setup)
 * - Apex: Shows single high badge (-90% OFF)
 * - Alpha: Shows single low badge (-25%)
 * - Elite: Shows no-discount badge (Full price)
 */
