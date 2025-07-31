'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserSession } from '@/lib/context/UserSessionProvider';
import StripeCheckoutButton from '@/components/stripe-checkout-button';
import { calculatePrice, getOneTimePriceId, getSubscriptionPriceId, getPerListingRate, type BillingType } from '@/lib/pricing';

interface ProPlanSelectorProps {
  className?: string;
}

export default function ProPlanSelector({ className = "" }: ProPlanSelectorProps) {
  const [listingCount, setListingCount] = useState(1);
  const [billingType, setBillingType] = useState<BillingType>('subscription');
  const { session } = useUserSession();
  
  const totalPrice = calculatePrice(listingCount, billingType);
  const perListingRate = getPerListingRate(listingCount, billingType);


  return (
    <Card className={`border-primary ${className} flex flex-col`}>
      <CardHeader>
        <CardTitle className="text-2xl">Pro Plan</CardTitle>
        <p className="text-muted-foreground">STR Genius + Market Spy features with flexible pricing</p>
      </CardHeader>
      <CardContent className="space-y-6 flex-1 flex flex-col">
        <div>
          <h4 className="font-semibold mb-3">✅ Market Spy Features:</h4>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li>• Find nearby similar properties</li>
            <li>• Competitor occupancy analysis</li>
            <li>• Performance benchmarking</li>
            <li>• Amenities comparison</li>
            <li>• Policy analysis</li>
          </ul>
        </div>

        {/* Billing Type Selector */}
        <div className="space-y-4">
          <Tabs value={billingType} onValueChange={(value) => setBillingType(value as BillingType)} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="subscription">Monthly Subscription</TabsTrigger>
              <TabsTrigger value="one_time">One-Time Payment</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Listing Count Selector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Number of Listings:</label>
            <Select value={listingCount.toString()} onValueChange={(value) => setListingCount(Number(value))}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({length: 20}, (_, i) => i + 1).map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} listing{num > 1 ? 's' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pricing Summary */}
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Billing type:</span>
              <span className="font-medium capitalize">{billingType === 'subscription' ? 'Monthly' : 'One-time'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Listings included:</span>
              <span className="font-medium">{listingCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Rate per listing:</span>
              <span className="font-medium">${perListingRate.toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}{billingType === 'subscription' ? '/month' : ''}</span>
            </div>
          </div>
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-1"></div>

        {/* Checkout Button */}
        <div className="pt-4">
          {session ? (
            billingType === 'subscription' ? (
              <StripeCheckoutButton
                priceId={getSubscriptionPriceId()}
                quantity={listingCount} // Volume pricing handles quantity automatically
                buttonText={`Subscribe for $${totalPrice.toFixed(2)}/month`}
                successUrl="/account?success=true"
                cancelUrl="/pricing"
                className="w-full"
                mode="subscription"
              />
            ) : (
              listingCount <= 10 ? (
                <StripeCheckoutButton
                  priceId={getOneTimePriceId(listingCount)!}
                  quantity={1}
                  buttonText={`Pay $${totalPrice.toFixed(2)} once`}
                  successUrl="/account?success=true"
                  cancelUrl="/pricing"
                  className="w-full"
                  mode="payment"
                />
              ) : (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    For {listingCount}+ listings, please contact us for custom pricing.
                  </p>
                  <Button className="w-full" onClick={() => window.location.href = 'mailto:support@strsage.com'}>
                    Contact Us for Custom Pricing
                  </Button>
                </div>
              )
            )
          ) : (
            <Button className="w-full" onClick={() => window.location.href = '/login'}>
              Login to Get Started
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}