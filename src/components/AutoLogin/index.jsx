import React, { useEffect, useState } from 'react';
import { autoAuthenticate, isAuthenticated, getCurrentUser } from '../../services/hiddenAuthService';

const AutoLogin = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const performAutoLogin = async () => {
      try {
        console.log('🔄 Auto-login in progress...');
        
        // Perform auto-authentication
        const result = autoAuthenticate();
        
        if (result.success) {
          console.log('✅ Auto-login successful:', result.user);
          setIsAuth(true);
          setUser(result.user);
        } else {
          console.log('❌ Auto-login failed:', result.error);
        }
      } catch (error) {
        console.error('🚨 Auto-login error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Perform auto-login immediately
    performAutoLogin();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Auto-login in progress...</p>
          <p className="text-sm text-gray-500 mt-2">Using credentials: {user?.email || 'codersstar@gmail.com'}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Auto-Login Failed</h2>
            <p className="text-gray-600 mb-6">
              Automatic authentication failed. Please check your credentials.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-colors"
            >
              Retry Auto-Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated, render children
  return (
    <div>
      {/* Hidden authentication status */}
      <div className="hidden">
        Auto-login successful for: {user?.email}
      </div>
      {children}
    </div>
  );
};

export default AutoLogin; 