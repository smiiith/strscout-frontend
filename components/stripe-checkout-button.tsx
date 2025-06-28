"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoadingOverlay from '@/components/LoadingOverlay';

interface StripeCheckoutButtonProps {
  priceId: string;
  buttonText: string;
  className?: string;
  disabled?: boolean;
}

export default function StripeCheckoutButton({
  priceId,
  buttonText,
  className = '',
  disabled = false,
}: StripeCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {loading && <LoadingOverlay />}
      <Button
        onClick={handleCheckout}
        disabled={disabled || loading}
        className={className}
      >
        {loading ? 'Loading...' : buttonText}
      </Button>
    </div>
  );
}