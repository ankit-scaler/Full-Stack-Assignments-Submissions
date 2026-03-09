export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-red-50/90 border border-red-200 rounded-2xl p-6 max-w-md w-full shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-6 h-6 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-bold text-red-800">Something went wrong</h3>
        </div>
        <p className="text-red-700 font-medium mb-5">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full px-4 py-2.5 font-semibold bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 shadow-card"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
