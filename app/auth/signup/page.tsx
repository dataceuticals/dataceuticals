'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { signUp, signInWithGoogle, error, clearError } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [returnUrl, setReturnUrl] = useState('/');

  useEffect(() => {
    const returnParam = searchParams.get('return');
    if (returnParam) {
      setReturnUrl(returnParam);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setFormData(prev => ({ ...prev, confirmPassword: '' }));
      return;
    }

    try {
      await signUp(formData.email, formData.password, formData.displayName);
      router.push(returnUrl); // Redirect to return URL after successful signup
    } catch (error) {
      // Error is handled by the auth context
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    clearError();

    try {
      await signInWithGoogle();
      router.push(returnUrl); // Redirect to return URL after successful signup
    } catch (error) {
      // Error is handled by the auth context
      console.error('Google sign-in failed:', error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center pt-16"
      style={{
        background: 'var(--background)'
      }}
    >
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 
            className="text-3xl font-bold"
            style={{
              color: 'var(--foreground)'
            }}
          >
            Create your account
          </h2>
          <p 
            className="mt-2 text-sm"
            style={{
              color: 'var(--muted-foreground)'
            }}
          >
            Join DataCeuTicals and start your learning journey
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label 
                htmlFor="displayName" 
                className="block text-sm font-medium"
                style={{
                  color: 'var(--foreground)'
                }}
              >
                Full Name
              </label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                autoComplete="name"
                required
                value={formData.displayName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--card)',
                  color: 'var(--foreground)',
                  borderColor: 'var(--border)',
                  border: '1px solid'
                }}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium"
                style={{
                  color: 'var(--foreground)'
                }}
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--card)',
                  color: 'var(--foreground)',
                  borderColor: 'var(--border)',
                  border: '1px solid'
                }}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium"
                style={{
                  color: 'var(--foreground)'
                }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--card)',
                  color: 'var(--foreground)',
                  borderColor: 'var(--border)',
                  border: '1px solid'
                }}
                placeholder="Create a password (min 6 characters)"
                minLength={6}
              />
            </div>

            <div>
              <label 
                htmlFor="confirmPassword" 
                className="block text-sm font-medium"
                style={{
                  color: 'var(--foreground)'
                }}
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--card)',
                  color: 'var(--foreground)',
                  borderColor: 'var(--border)',
                  border: '1px solid'
                }}
                placeholder="Confirm your password"
                minLength={6}
              />
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'var(--brand-primary)',
                color: 'var(--brand-primary-foreground)',
                border: 'none'
              }}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div 
                  className="w-full border-t"
                  style={{
                    borderColor: 'var(--border)'
                  }}
                />
              </div>
              <div className="relative flex justify-center text-sm">
                <span 
                  className="px-2"
                  style={{
                    backgroundColor: 'var(--background-solid)',
                    color: 'var(--muted-foreground)'
                  }}
                >
                  Or continue with
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="w-full flex justify-center items-center gap-3 py-2 px-4 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'var(--card)',
                color: 'var(--foreground)',
                borderColor: 'var(--border)',
                border: '1px solid'
              }}
            >
              {isGoogleLoading ? (
                'Signing up...'
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign up with Google
                </>
              )}
            </button>
          </div>

          <div className="text-center">
            <p 
              className="text-sm"
              style={{
                color: 'var(--muted-foreground)'
              }}
            >
              Already have an account?{' '}
              <Link 
                href="/auth/login" 
                className="font-medium"
                style={{
                  color: 'var(--brand-primary)'
                }}
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
