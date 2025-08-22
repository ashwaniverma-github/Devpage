export default function Loading() {
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="text-center">
        {/* Dual Spinning Rings */}
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-gray-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-gray-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        
      </div>
    </div>
  );
}