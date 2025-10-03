'use client';

import { useAuth } from '../contexts/AuthContext';

export default function TestAuthPage() {
  const { user, loading, error, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Authentication Test
          </h2>
          <p className="mt-2 text-sm text-muted">
            Testing Firebase authentication setup
          </p>
        </div>

        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-md text-sm">
              Error: {error}
            </div>
          )}

          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-2">Current State:</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</div>
              <div><strong>User:</strong> {user ? 'Logged In' : 'Not Logged In'}</div>
              {user && (
                <>
                  <div><strong>Name:</strong> {user.displayName || 'N/A'}</div>
                  <div><strong>Email:</strong> {user.email || 'N/A'}</div>
                  <div><strong>UID:</strong> {user.uid}</div>
                </>
              )}
            </div>
          </div>

          {user && (
            <button
              onClick={signOut}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-brand-primary-foreground bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
            >
              Sign Out
            </button>
          )}

          <div className="text-center">
            <p className="text-sm text-muted">
              {user ? 'You are successfully authenticated!' : 'Please sign in to test authentication'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
