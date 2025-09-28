import React from 'react';
import { AuthFormErrorFallbackProps } from '@/interfaces'


const AuthFormErrorFallback: React.FC<AuthFormErrorFallbackProps> = ({ error, resetError }) => {
  return (
    <div className="flex justify-center items-center p-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6 text-center max-w-md w-full shadow-lg">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Authentication Error</h3>
        <p className="text-gray-600 mb-4">We encountered an issue while loading the authentication form.</p>
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <small className="text-sm text-gray-500">Error: {error.message}</small>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={resetError}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex-1"
          >
            Reload Form
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex-1"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthFormErrorFallback;
