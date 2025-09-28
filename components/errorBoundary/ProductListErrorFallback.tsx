import React from 'react';
import { ProductListErrorFallbackProps } from '@/interfaces'


const ProductListErrorFallback: React.FC<ProductListErrorFallbackProps> = ({ error, resetError }) => {
  return (
    <div className="p-6">
      <div className="bg-gray-50 rounded-xl p-8 text-center max-w-2xl mx-auto">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Products Unavailable</h2>
        <p className="text-gray-600 mb-6">
          We&apos;re having trouble loading our products. This might be a temporary issue.
        </p>
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <small className="text-sm text-gray-500">Error: {error.message}</small>
        </div>
        <div className="bg-white rounded-lg p-4 mb-6 text-left">
          <h4 className="font-semibold text-gray-900 mb-3">What you can do:</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>Check your internet connection</li>
            <li>Try reloading the products</li>
            <li>Contact support if the problem persists</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={resetError}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>↻</span>
            Retry Loading Products
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>🏠</span>
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListErrorFallback;
