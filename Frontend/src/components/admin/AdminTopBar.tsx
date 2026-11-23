'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Shield, ShieldAlert, LogOut, Sliders, ExternalLink, Lock, Eye, EyeOff } from 'lucide-react';
import { adminAuth } from '@/services/adminAuth';

export default function AdminTopBar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [adminIdInput, setAdminIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Listen for auth state
    const unsubscribe = adminAuth.subscribe((authenticated) => {
      setIsAdmin(authenticated);
    });

    // Keyboard shortcut to open admin login: Ctrl + Shift + A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (adminAuth.isAuthenticated()) {
          router.push('/admin');
        } else {
          setShowLoginModal(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      unsubscribe();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoading(true);

    const res = adminAuth.login(adminIdInput, passwordInput);
    setIsLoading(false);

    if (res.success) {
      setShowLoginModal(false);
      setAdminIdInput('');
      setPasswordInput('');
      router.push('/admin');
    } else {
      setLoginError(res.message || 'Login failed');
    }
  };

  const handleLogout = () => {
    adminAuth.logout();
    if (pathname.startsWith('/admin')) {
      router.push('/');
    }
  };

  // If NOT logged in as admin, DO NOT display any admin UI to normal visitors
  if (!isAdmin) {
    return (
      <>
        {/* Invisible listener for login modal via Ctrl+Shift+A */}
        {showLoginModal && (
          <div
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setShowLoginModal(false)}
          >
            <div
              className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-md w-full p-8 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500" />

              <div className="text-center space-y-2 mb-6 pt-2">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Authentication</h3>
                <p className="text-xs text-gray-500 font-light">
                  Enter your credentials to unlock website management
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {loginError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Admin ID / Username</label>
                  <input
                    type="text"
                    value={adminIdInput}
                    onChange={(e) => setAdminIdInput(e.target.value)}
                    placeholder="Enter Admin ID (default: admin)"
                    autoFocus
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Enter Password (default: admin)"
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-900 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowLoginModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2.5 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                  >
                    {isLoading ? 'Verifying...' : 'Log In'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }

  // When LOGGED IN as Admin: display discrete top admin status bar
  return (
    <div className="fixed top-0 left-0 right-0 z-[9990] bg-gray-950/90 text-white backdrop-blur-md border-b border-white/10 px-4 py-2 text-xs flex items-center justify-between shadow-xl">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1.5 font-semibold text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Shield className="w-3.5 h-3.5" />
          <span className="tracking-wide uppercase text-[10px]">Admin Active</span>
        </div>
        <span className="text-gray-500">|</span>
        <span className="text-gray-300 hidden sm:inline text-[11px]">
          ID: <strong className="text-white font-mono">{adminAuth.getSession()?.adminId || 'admin'}</strong>
        </span>
      </div>

      <div className="flex items-center space-x-3">
        <Link
          href="/admin"
          className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 transition-all shadow-sm"
        >
          <Sliders className="w-3 h-3" />
          <span>Admin Studio</span>
        </Link>

        <button
          onClick={handleLogout}
          title="Sign out of Admin Session"
          className="text-gray-400 hover:text-red-400 flex items-center space-x-1 text-xs transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
}
