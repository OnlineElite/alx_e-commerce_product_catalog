import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer'


const GlobalErrorFallback = ({ error, resetError }: { error: Error; resetError: () => void }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Oops! Something went wrong</h1>
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <small className="text-sm text-gray-500">Error: {error.message}</small>
          </div>
          <p className="text-gray-600 mb-6">
            We apologize for the inconvenience. Please try refreshing the page.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={resetError}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GlobalErrorFallback;
