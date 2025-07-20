'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserSession } from '@/lib/context/UserSessionProvider';
import StripeCheckoutButton from '@/components/stripe-checkout-button';

interface ProPlanSelectorProps {
  className?: string;
}

export default function ProPlanSelector({ className = "" }: ProPlanSelectorProps) {
  const [quantity, setQuantity] = useState(1);
  const { session } = useUserSession();
  
  const basePrice = 49;
  const totalPrice = quantity * basePrice;
  const totalListings = quantity * 2;


  return (
    <Card className={`border-primary ${className} flex flex-col`}>
      <CardHeader>
        <CardTitle className="text-2xl">Pro Plan</CardTitle>
        <p className="text-muted-foreground">STR Genius + Market Spy features</p>
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

        {/* Quantity Selector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Number of Pro Plans:</label>
            <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number(value))}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pricing Summary */}
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Price per plan:</span>
              <span className="font-medium">${basePrice}/month</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Quantity:</span>
              <span className="font-medium">{quantity}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Market Spy listings:</span>
              <span className="font-medium">{totalListings}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span>${totalPrice}/month</span>
            </div>
          </div>
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-1"></div>

        {/* Checkout Button */}
        <div className="pt-4">
          {session ? (
            <StripeCheckoutButton
              priceId={process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!}
              quantity={quantity}
              buttonText={`Subscribe for $${totalPrice}/month`}
              successUrl="/account?success=true"
              cancelUrl="/pricing"
              className="w-full"
            />
          ) : (
            <Button className="w-full" onClick={() => window.location.href = '/login'}>
              Login to Subscribe
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}