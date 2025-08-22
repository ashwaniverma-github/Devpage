import React from 'react';

function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="w-48 h-8 bg-gray-800 rounded animate-pulse"></div>
          <div className="w-24 h-6 bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="w-1/4 h-full bg-gray-600 animate-pulse"></div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
          {/* Step Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
            </div>
            <div className="w-64 h-8 bg-gray-800 rounded mx-auto mb-2 animate-pulse"></div>
            <div className="w-48 h-5 bg-gray-700 rounded mx-auto animate-pulse"></div>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gray-800 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
            </div>
            
            {/* Form Fields */}
            <div className="flex-1 space-y-6">
              <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-full h-12 bg-gray-800 rounded-lg animate-pulse"></div>
              <div className="w-full h-24 bg-gray-800 rounded-lg animate-pulse"></div>
              <div className="flex items-center space-x-3">
                <div className="w-32 h-10 bg-gray-700 rounded animate-pulse"></div>
                <div className="w-48 h-4 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-800">
          <div className="w-24 h-10 bg-gray-800 rounded-lg animate-pulse"></div>
          <div className="w-32 h-10 bg-gray-700 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoader;
