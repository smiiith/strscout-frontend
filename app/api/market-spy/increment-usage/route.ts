import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const supabase = await createClient();
    
    // Get current usage and limit
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('market_spy_listings_used, market_spy_listings_limit, one_time_listings_balance, billing_type')
      .eq('id', userId)
      .single();

    if (fetchError || !profile) {
      console.error('Error fetching user profile:', fetchError);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const currentUsed = profile.market_spy_listings_used || 0;
    const limit = profile.market_spy_listings_limit || 0;
    const oneTimeBalance = profile.one_time_listings_balance || 0;

    // Check if user has remaining runs
    if (currentUsed >= limit) {
      return NextResponse.json({
        error: 'Usage limit exceeded',
        used: currentUsed,
        limit: limit
      }, { status: 403 });
    }

    // Decrement from one-time balance first, then subscription
    const updateData: any = {
      market_spy_listings_used: currentUsed + 1,
      updated_at: new Date().toISOString()
    };

    if (oneTimeBalance > 0) {
      // Use one-time balance first
      updateData.one_time_listings_balance = oneTimeBalance - 1;
      console.log(`💰 Decrementing one-time balance: ${oneTimeBalance} -> ${oneTimeBalance - 1}`);
    }

    // Increment usage
    const { error: updateError } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating usage:', updateError);
      return NextResponse.json({ error: 'Failed to update usage' }, { status: 500 });
    }

    console.log(`✅ Incremented Market Spy usage for user ${userId}: ${currentUsed + 1}/${limit}`);
    
    return NextResponse.json({ 
      success: true,
      used: currentUsed + 1,
      limit: limit,
      remaining: limit - (currentUsed + 1)
    });

  } catch (error) {
    console.error('Error in increment-usage endpoint:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}