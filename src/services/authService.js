// Simple Authentication Service using localStorage
// This provides basic authentication without a backend

const AUTH_KEY = 'hp_school_auth';
const ADMIN_CREDENTIALS = {
  username: 'codersstar@gmail.com', // Replace with your actual email
  password: 'SSLA@123a', // Replace with your actual password
  role: 'admin'
};

// Check if user is authenticated
export const isAuthenticated = () => {
  try {
    const auth = localStorage.getItem(AUTH_KEY);
    if (!auth) return false;
    
    const authData = JSON.parse(auth);
    const now = Date.now();
    
    // Check if token is expired (24 hours)
    if (authData.expiresAt && now > authData.expiresAt) {
      logout();
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
};

// Get current user info
export const getCurrentUser = () => {
  try {
    const auth = localStorage.getItem(AUTH_KEY);
    if (!auth) return null;
    
    const authData = JSON.parse(auth);
    return authData.user;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
};

// Sign in function
export const signIn = (username, password) => {
  try {
    // Simple credential check (in production, this would be against a backend)
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const authData = {
        user: {
          username: ADMIN_CREDENTIALS.username,
          role: ADMIN_CREDENTIALS.role,
          name: 'Administrator'
        },
        token: generateToken(),
        expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
      
      return {
        success: true,
        user: authData.user,
        message: 'Sign in successful!'
      };
    } else {
      return {
        success: false,
        message: 'Invalid username or password'
      };
    }
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      success: false,
      message: 'Sign in failed. Please try again.'
    };
  }
};

// Sign out function
export const logout = () => {
  try {
    localStorage.removeItem(AUTH_KEY);
    return {
      success: true,
      message: 'Signed out successfully'
    };
  } catch (error) {
    console.error('Logout error:', error);
    return {
      success: false,
      message: 'Logout failed'
    };
  }
};

// Generate a simple token (in production, use proper JWT)
const generateToken = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return btoa(`${timestamp}-${random}-hp-school`).replace(/[^a-zA-Z0-9]/g, '');
};

// Check if user has admin role
export const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.role === 'admin';
};

// Require authentication for protected routes
export const requireAuth = (callback) => {
  if (!isAuthenticated()) {
    // Redirect to login or show login modal
    return false;
  }
  return callback ? callback() : true;
};

// Get auth status for debugging
export const getAuthStatus = () => {
  return {
    isAuthenticated: isAuthenticated(),
    currentUser: getCurrentUser(),
    isAdmin: isAdmin(),
    hasAuthKey: !!localStorage.getItem(AUTH_KEY)
  };
}; 