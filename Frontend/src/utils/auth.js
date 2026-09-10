/**
 * Centralized Authentication Utility for Mini Sales CRM
 * Manages frontend demo authentication state and user session storage.
 * Designed so it can easily be updated to connect to a backend JWT endpoint in future phases.
 */

const AUTH_STORAGE_KEY = 'crm_auth_session';

const STATIC_CREDENTIALS = {
  username: 'admin',
  password: 'admin@123',
};

export const auth = {
  /**
   * Authenticates user against static credentials.
   * @param {string} username
   * @param {string} password
   * @returns {Promise<{ success: boolean, message?: string, user?: object }>}
   */
  login: async (username, password) => {
    // Simulated micro-delay for realistic async feel and UX feedback
    await new Promise((resolve) => setTimeout(resolve, 300));

    const trimmedUsername = (username || '').trim();
    const trimmedPassword = (password || '').trim();

    if (
      trimmedUsername === STATIC_CREDENTIALS.username &&
      trimmedPassword === STATIC_CREDENTIALS.password
    ) {
      const sessionData = {
        isLoggedIn: true,
        user: {
          username: 'admin',
          name: 'System Administrator',
          role: 'Admin',
        },
        loginTime: new Date().toISOString(),
      };

      try {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
      } catch (err) {
        console.error('Failed to save auth session to localStorage', err);
      }

      return {
        success: true,
        user: sessionData.user,
      };
    }

    return {
      success: false,
      message: 'Invalid username or password',
    };
  },

  /**
   * Removes current session and logs out user.
   */
  logout: () => {
    try {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear auth session from localStorage', err);
    }
  },

  /**
   * Checks whether the current user is authenticated.
   * @returns {boolean}
   */
  isAuthenticated: () => {
    try {
      return localStorage.getItem('isAuthenticated') === 'true';
    } catch {
      return false;
    }
  },

  /**
   * Retrieves the current authenticated user profile.
   * @returns {object|null}
   */
  getUser: () => {
    try {
      const session = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!session) return null;
      const parsed = JSON.parse(session);
      return parsed?.user || null;
    } catch {
      return null;
    }
  },
};

export default auth;
