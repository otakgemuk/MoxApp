// BuyNowButton.tsx
//
// Redirects user to prop firm affiliate link

import type { PlanRow } from '../hooks/usePlans';

interface BuyNowButtonProps {
  plan: PlanRow;
  variant?: 'default' | 'compact';
}

export function BuyNowButton({ plan, variant = 'default' }: BuyNowButtonProps) {
  if (!plan.website_url) {
    return (
      <button disabled className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-700 text-gray-500 cursor-not-allowed">
        N/A
      </button>
    );
  }

  const handleClick = () => {
    // Open in new tab to preserve user's current session
    window.open(plan.website_url, '_blank', 'noopener,noreferrer');
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleClick}
        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-brand-500 text-white hover:bg-brand-600 transition font-medium text-xs"
        title={`Go to ${plan.firm_name}`}
      >
        →
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 transition shadow-sm"
    >
      Buy Now
    </button>
  );
}
