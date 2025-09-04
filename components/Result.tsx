
import React from 'react';
import { RefreshIcon } from './icons';

interface ResultProps {
  isLoading: boolean;
  image: string | null;
  error: string | null;
  onReset: () => void;
}

const LoadingIndicator: React.FC = () => {
    const messages = [
        "Analyzing architectural context...",
        "Applying rectified flow integration...",
        "Calculating creative GPS balance...",
        "Rendering with photorealistic precision...",
        "Adding imperfection reality evidence...",
        "Finalizing high-resolution details..."
    ];
    const [message, setMessage] = React.useState(messages[0]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setMessage(prev => {
                const currentIndex = messages.indexOf(prev);
                return messages[(currentIndex + 1) % messages.length];
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-secondary mx-auto"></div>
            <p className="text-xl font-semibold text-brand-dark mt-6">Generating Your Vision...</p>
            <p className="text-gray-500 mt-2 transition-opacity duration-500">{message}</p>
        </div>
    );
};

const Result: React.FC<ResultProps> = ({ isLoading, image, error, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200 min-h-[400px] flex flex-col justify-center items-center">
        {isLoading && <LoadingIndicator />}
        
        {error && !isLoading && (
          <div className="text-red-600">
            <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium">Image Generation Failed</h3>
            <p className="mt-2 text-sm text-red-500 max-w-md mx-auto">{error}</p>
            <button
              onClick={onReset}
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-secondary hover:bg-blue-600 focus:outline-none"
            >
              <RefreshIcon className="w-5 h-5 mr-2" />
              Try Again
            </button>
          </div>
        )}

        {image && !isLoading && (
          <div>
            <h2 className="text-3xl font-bold text-brand-dark mb-4">Synthesis Complete!</h2>
            <p className="text-gray-600 mb-6">Here is the AI-generated visualization of your project.</p>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src={image} alt="Generated architectural synthesis" className="w-full h-auto" />
            </div>
            <button
              onClick={onReset}
              className="mt-8 inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-blue-800 focus:outline-none"
            >
              <RefreshIcon className="w-5 h-5 mr-2" />
              Start a New Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
