// app/auth/error/page.tsx
import Link from 'next/link';

export default function AuthError({
    searchParams,
}: {
    searchParams: { reason?: string };
}) {
    const reason = searchParams?.reason;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
                <p className="mb-6">
                    There was a problem completing your authentication process. This could be due to an expired or invalid link.
                </p>
                {reason && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-left">
                        <p className="text-sm font-semibold text-red-800 mb-1">Error Details:</p>
                        <p className="text-sm text-red-700 font-mono break-words">{reason}</p>
                    </div>
                )}
                <div className="flex flex-col space-y-4">
                    <Link
                        href="/login"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Return to Login
                    </Link>
                    <Link
                        href="/"
                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}