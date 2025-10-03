'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">Application Error</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-6">
              A critical error occurred. Please refresh the page.
            </p>
          </div>
          
          <button 
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-teal-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}