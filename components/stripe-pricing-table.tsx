'use client';

import { useEffect, useRef } from 'react';

interface StripePricingTableProps {
  pricingTableId: string;
  publishableKey: string;
  customerEmail?: string;
  className?: string;
  nonce?: string;
}

export default function StripePricingTable({
  pricingTableId,
  publishableKey,
  customerEmail,
  className = "",
  nonce
}: StripePricingTableProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Load Stripe pricing table script if not already loaded
    if (!scriptLoadedRef.current) {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/pricing-table.js';
      script.async = true;
      if (nonce) {
        script.setAttribute('nonce', nonce);
      }
      script.onload = () => {
        scriptLoadedRef.current = true;
      };
      document.head.appendChild(script);

      return () => {
        // Don't remove script on cleanup as it may be used by other components
      };
    }
  }, [nonce]);

  return (
    <div ref={containerRef} className={className}>
      <stripe-pricing-table
        pricing-table-id={pricingTableId}
        publishable-key={publishableKey}
        customer-email={customerEmail}
      />
    </div>
  );
}

// TypeScript declaration for the custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': {
        'pricing-table-id': string;
        'publishable-key': string;
        'customer-email'?: string;
      };
    }
  }
}