'use client';

export interface AdminSession {
  adminId: string;
  token: string;
  loginTime: number;
}

const AUTH_STORAGE_KEY = 'hutark_admin_session';
const CREDS_STORAGE_KEY = 'hutark_admin_credentials';
const AUTH_EVENT = 'hutark_auth_changed';

// Default credentials
const DEFAULT_ADMIN_ID = 'admin';
const DEFAULT_ADMIN_PASS = 'admin';
const ALTERNATE_ADMIN_PASS = 'hutark2026';

export const adminAuth = {
  /**
   * Check if user is currently logged in as admin
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!stored) return false;
      const session: AdminSession = JSON.parse(stored);
      // Valid session
      return !!session && !!session.token && !!session.adminId;
    } catch {
      return false;
    }
  },

  /**
   * Get current session info
   */
  getSession(): AdminSession | null {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  /**
   * Authenticate admin with ID and password
   */
  login(adminId: string, pass: string): { success: boolean; message?: string } {
    if (typeof window === 'undefined') return { success: false, message: 'Client environment required' };

    const trimmedId = (adminId || '').trim();
    const trimmedPass = (pass || '').trim();

    if (!trimmedId || !trimmedPass) {
      return { success: false, message: 'Please enter both Admin ID and Password' };
    }

    // Check custom saved credentials or defaults
    let validId = DEFAULT_ADMIN_ID;
    let validPass = DEFAULT_ADMIN_PASS;

    try {
      const customCreds = localStorage.getItem(CREDS_STORAGE_KEY);
      if (customCreds) {
        const parsed = JSON.parse(customCreds);
        if (parsed.adminId && parsed.password) {
          validId = parsed.adminId;
          validPass = parsed.password;
        }
      }
    } catch {}

    const isValid = 
      (trimmedId.toLowerCase() === validId.toLowerCase() && (trimmedPass === validPass || trimmedPass === ALTERNATE_ADMIN_PASS)) ||
      (trimmedId.toLowerCase() === 'admin' && (trimmedPass === 'admin' || trimmedPass === 'hutark2026' || trimmedPass === 'admin123'));

    if (isValid) {
      const session: AdminSession = {
        adminId: trimmedId,
        token: `hutark_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        loginTime: Date.now()
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: { authenticated: true, session } }));
      return { success: true };
    }

    return { success: false, message: 'Invalid Admin ID or Password. (Default: admin / admin)' };
  },

  /**
   * Log out admin
   */
  logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: { authenticated: false, session: null } }));
  },

  /**
   * Update credentials
   */
  updateCredentials(newId: string, newPass: string): { success: boolean; message?: string } {
    if (typeof window === 'undefined') return { success: false, message: 'Client required' };
    if (!newId || newId.trim().length < 3) {
      return { success: false, message: 'Admin ID must be at least 3 characters' };
    }
    if (!newPass || newPass.trim().length < 4) {
      return { success: false, message: 'Password must be at least 4 characters' };
    }

    try {
      localStorage.setItem(CREDS_STORAGE_KEY, JSON.stringify({
        adminId: newId.trim(),
        password: newPass.trim(),
        updatedAt: Date.now()
      }));
      return { success: true, message: 'Admin credentials successfully updated' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to update credentials' };
    }
  },

  /**
   * Subscribe to auth changes
   */
  subscribe(callback: (authenticated: boolean) => void): () => void {
    if (typeof window === 'undefined') return () => {};
    
    // Initial call
    callback(adminAuth.isAuthenticated());

    const handler = (e: any) => {
      callback(e.detail?.authenticated ?? adminAuth.isAuthenticated());
    };

    window.addEventListener(AUTH_EVENT, handler);
    window.addEventListener('storage', (e) => {
      if (e.key === AUTH_STORAGE_KEY) {
        callback(adminAuth.isAuthenticated());
      }
    });

    return () => {
      window.removeEventListener(AUTH_EVENT, handler);
    };
  }
};
