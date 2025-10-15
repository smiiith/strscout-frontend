import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    console.log('Auth callback - Full URL:', requestUrl.href);
    console.log('Auth callback - Code present:', !!code);

    const supabase = createClient();

    // If there's a code, exchange it for a session (OAuth/PKCE flow)
    if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
            console.error('Error exchanging code for session:', {
                message: error.message,
                status: error.status,
                name: error.name,
                code: error.code
            });
            const errorUrl = new URL('/auth/error', requestUrl.origin);
            errorUrl.searchParams.set('reason', error.message || 'exchange_failed');
            return NextResponse.redirect(errorUrl);
        }

        console.log('Auth callback - Code exchange success! Redirecting to login page');
        return NextResponse.redirect(new URL('/login', requestUrl.origin));
    }

    // If there's no code, check if session already exists (email confirmation flow)
    // Supabase may have already set the session via cookies during the redirect
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
        console.error('Auth callback - Error getting session:', sessionError);
        const errorUrl = new URL('/auth/error', requestUrl.origin);
        errorUrl.searchParams.set('reason', sessionError.message || 'session_error');
        return NextResponse.redirect(errorUrl);
    }

    if (session) {
        console.log('Auth callback - Session found! User already authenticated. Redirecting to login page');
        return NextResponse.redirect(new URL('/login', requestUrl.origin));
    }

    // No code and no session - something went wrong
    console.error('Auth callback - No code and no session found');
    return NextResponse.redirect(new URL('/auth/error?reason=no_code_or_session', requestUrl.origin));
}