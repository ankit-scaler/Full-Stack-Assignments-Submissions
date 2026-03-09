export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative w-14 h-14 sm:w-16 sm:h-16">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-transparent animate-spin"></div>
        <div
          className="absolute inset-0 rounded-full border-4 border-amber-400 border-b-transparent animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}
        />
      </div>
    </div>
  );
}
