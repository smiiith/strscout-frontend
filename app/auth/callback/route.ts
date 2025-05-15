import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    // If there's no code, something went wrong
    if (!code) {
        return NextResponse.redirect(new URL('/auth/error', requestUrl.origin));
    }

    const supabase = createClient();

    // Exchange the code for a session
    // This will automatically log the user in
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
        console.error('Error exchanging code for session:', error);
        return NextResponse.redirect(new URL('/auth/error', requestUrl.origin));
    }

    // Redirect to your desired page after successful authentication
    // For example, to a dashboard or property assessment page
    return NextResponse.redirect(new URL('/properties/assess-property/single', requestUrl.origin));
}