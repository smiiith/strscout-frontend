import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { LOCALITIES } from '@/lib/localities';

const HOST = 'www.strsage.com';
const KEY = process.env.INDEXNOW_KEY!;
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// All public sitemap URLs - mirrors app/sitemap.ts
const BASE_URLS = [
  `https://${HOST}`,
  `https://${HOST}/feedback-genius`,
  `https://${HOST}/market-spy`,
  `https://${HOST}/market-scout`,
  `https://${HOST}/bookings-down`,
  `https://${HOST}/host-assist`,
  `https://${HOST}/about-us`,
  `https://${HOST}/pricing`,
  `https://${HOST}/guides`,
  `https://${HOST}/guides/airbnb-fees`,
  `https://${HOST}/guides/airbnb-title-optimization`,
  `https://${HOST}/guides/airbnb-photo-tips`,
  `https://${HOST}/guides/airbnb-amenities-checklist`,
  `https://${HOST}/guides/airbnb-description-writing`,
  `https://${HOST}/guides/str-interior-design-tips`,
  `https://${HOST}/guides/improve-airbnb-rating`,
  `https://${HOST}/faq`,
  `https://${HOST}/contact-us`,
  `https://${HOST}/privacy-policy`,
  `https://${HOST}/terms`,
];

const LOCALITY_URLS = LOCALITIES.flatMap((l) => [
  `https://${HOST}/market-spy/${l.slug}`,
  `https://${HOST}/market-scout/${l.slug}`,
  `https://${HOST}/feedback-genius/${l.slug}`,
]);

const SITEMAP_URLS = [...BASE_URLS, ...LOCALITY_URLS];

export async function POST(request: NextRequest) {
  if (!KEY) {
    return NextResponse.json({ error: 'INDEXNOW_KEY not configured' }, { status: 500 });
  }

  // Require admin auth
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (profileError || !profile?.is_admin) {
    return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
  }

  // Use provided URLs or fall back to all sitemap URLs
  let urlList: string[] = SITEMAP_URLS;
  try {
    const body = await request.json().catch(() => ({}));
    if (Array.isArray(body.urls) && body.urls.length > 0) {
      urlList = body.urls;
    }
  } catch {
    // No body or invalid JSON - use default sitemap URLs
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();

  if (!response.ok) {
    console.error('IndexNow submission failed:', response.status, responseText);
    return NextResponse.json(
      { error: `IndexNow returned ${response.status}`, detail: responseText },
      { status: 502 }
    );
  }

  return NextResponse.json({
    success: true,
    submitted: urlList.length,
    urls: urlList,
    indexNowStatus: response.status,
  });
}
