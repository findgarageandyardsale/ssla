import React, { useState, useEffect } from 'react';
import { isAuthenticated, getCurrentUser, autoAuthenticate, logout } from '../../services/hiddenAuthService';

const AutoLoginStatus = () => {
  const [authStatus, setAuthStatus] = useState({
    isAuthenticated: false,
    user: null,
    loading: true
  });

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      const user = getCurrentUser();
      
      setAuthStatus({
        isAuthenticated: authenticated,
        user: user,
        loading: false
      });
    };

    // Check immediately
    checkAuth();

    // Check again after a short delay to ensure auto-auth completes
    const timer = setTimeout(checkAuth, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleManualLogin = () => {
    console.log('🔄 Manual login triggered...');
    const result = autoAuthenticate();
    if (result.success) {
      setAuthStatus({
        isAuthenticated: true,
        user: result.user,
        loading: false
      });
    }
  };

  const handleLogout = () => {
    logout();
    setAuthStatus({
      isAuthenticated: false,
      user: null,
      loading: false
    });
  };

  if (authStatus.loading) {
    return (
      <div className="fixed top-4 right-4 bg-blue-100 border border-blue-300 text-blue-800 px-3 py-2 rounded-md text-sm">
        🔄 Auto-login in progress...
      </div>
    );
  }

  // if (authStatus.isAuthenticated) {
  //   return (
  //     <div className="fixed top-4 right-4 bg-green-100 border border-green-300 text-green-800 px-3 py-2 rounded-md text-sm">
  //       ✅ Auto-login successful: {authStatus.user?.email || 'Admin'}
  //       <button
  //         onClick={handleLogout}
  //         className="ml-2 text-green-600 hover:text-green-800 underline"
  //       >
  //         Logout
  //       </button>
  //     </div>
  //   );
  // }

  // return (
  //   <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-300 text-yellow-800 px-3 py-2 rounded-md text-sm">
  //     ⚠️ Auto-login failed
  //     <button
  //       onClick={handleManualLogin}
  //       className="ml-2 text-yellow-600 hover:text-yellow-800 underline"
  //     >
  //       Try Again
  //     </button>
  //   </div>
  // );
};

export default AutoLoginStatus; 