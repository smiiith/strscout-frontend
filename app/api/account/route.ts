import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the user's profile with billing info
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select(`
        id,
        billing_type,
        subscription_status,
        market_spy_listings_used,
        market_spy_listings_limit,
        current_tier,
        listings_purchased
      `)
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      return NextResponse.json(
        { error: 'Failed to fetch profile' },
        { status: 500 }
      );
    }

    // Calculate remaining runs
    const used = profile?.market_spy_listings_used || 0;
    const limit = profile?.market_spy_listings_limit || 0;
    const remainingRuns = Math.max(0, limit - used);

    return NextResponse.json({
      profile: {
        id: profile?.id,
        billing_type: profile?.billing_type,
        subscription_status: profile?.subscription_status,
        market_spy_listings_used: used,
        market_spy_listings_limit: limit,
        current_tier: profile?.current_tier,
        listings_purchased: profile?.listings_purchased,
        remaining_runs: remainingRuns,
      }
    });

  } catch (error) {
    console.error('Account API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}