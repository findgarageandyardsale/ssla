// Hidden Authentication Service
// This automatically authenticates users without showing any UI

const AUTH_KEY = 'hp_school_hidden_auth';

// Your credentials (replace with your actual email and password)
const HIDDEN_CREDENTIALS = {
  email: 'codersstar@gmail.com', // Replace with your actual email
  password: 'SSLA@123a', // Replace with your actual password
  role: 'admin'
};

// Auto-authenticate function
export const autoAuthenticate = () => {
  try {
    // Check if already authenticated
    const existingAuth = localStorage.getItem(AUTH_KEY);
    if (existingAuth) {
      const authData = JSON.parse(existingAuth);
      const now = Date.now();
      
      // Check if token is expired (24 hours)
      if (authData.expiresAt && now > authData.expiresAt) {
        localStorage.removeItem(AUTH_KEY);
      } else {
        return {
          success: true,
          user: authData.user,
          message: 'Already authenticated'
        };
      }
    }

    // Auto-authenticate with hidden credentials
    const authData = {
      user: {
        email: HIDDEN_CREDENTIALS.email,
        username: HIDDEN_CREDENTIALS.email.split('@')[0], // Use email prefix as username
        role: HIDDEN_CREDENTIALS.role,
        name: 'Administrator'
      },
      token: generateHiddenToken(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
      loginTime: new Date().toISOString(),
      autoAuthenticated: true
    };
    
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    
    console.log('Auto-authenticated successfully');
    
    return {
      success: true,
      user: authData.user,
      message: 'Auto-authenticated successfully'
    };
  } catch (error) {
    console.error('Auto-authentication error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Check if user is authenticated (hidden version)
export const isAuthenticated = () => {
  try {
    const auth = localStorage.getItem(AUTH_KEY);
    if (!auth) {
      // Try to auto-authenticate
      const result = autoAuthenticate();
      return result.success;
    }
    
    const authData = JSON.parse(auth);
    const now = Date.now();
    
    // Check if token is expired (24 hours)
    if (authData.expiresAt && now > authData.expiresAt) {
      localStorage.removeItem(AUTH_KEY);
      // Try to auto-authenticate again
      const result = autoAuthenticate();
      return result.success;
    }
    
    return true;
  } catch (error) {
    console.error('Hidden auth check error:', error);
    return false;
  }
};

// Get current user info (hidden version)
export const getCurrentUser = () => {
  try {
    const auth = localStorage.getItem(AUTH_KEY);
    if (!auth) {
      // Try to auto-authenticate
      autoAuthenticate();
      const newAuth = localStorage.getItem(AUTH_KEY);
      if (newAuth) {
        const authData = JSON.parse(newAuth);
        return authData.user;
      }
      return null;
    }
    
    const authData = JSON.parse(auth);
    return authData.user;
  } catch (error) {
    console.error('Get hidden user error:', error);
    return null;
  }
};

// Hidden sign in function (for compatibility)
export const signIn = (email, password) => {
  // Check if provided credentials match our hidden credentials
  if (email === HIDDEN_CREDENTIALS.email && password === HIDDEN_CREDENTIALS.password) {
    const result = autoAuthenticate();
    return result;
  } else {
    return {
      success: false,
      message: 'Invalid credentials'
    };
  }
};

// Logout function
export const logout = () => {
  try {
    localStorage.removeItem(AUTH_KEY);
    return {
      success: true,
      message: 'Signed out successfully'
    };
  } catch (error) {
    console.error('Hidden logout error:', error);
    return {
      success: false,
      message: 'Logout failed'
    };
  }
};

// Generate a hidden token
const generateHiddenToken = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return btoa(`${timestamp}-${random}-hp-school-hidden`).replace(/[^a-zA-Z0-9]/g, '');
};

// Check if user has admin role
export const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.role === 'admin';
};

// Get auth status for debugging
export const getAuthStatus = () => {
  return {
    isAuthenticated: isAuthenticated(),
    currentUser: getCurrentUser(),
    isAdmin: isAdmin(),
    hasAuthKey: !!localStorage.getItem(AUTH_KEY),
    autoAuthenticated: true
  };
};

// Initialize auto-authentication on import
console.log('🚀 Initializing auto-authentication...');
const initResult = autoAuthenticate();
console.log('✅ Auto-authentication initialized:', initResult.success ? 'Success' : 'Failed'); 