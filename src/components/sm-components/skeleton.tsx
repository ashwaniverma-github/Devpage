import React from 'react';

function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
          <div className="w-36 sm:w-48 h-6 sm:h-8 bg-gray-800 rounded animate-pulse mx-auto sm:mx-0"></div>
          <div className="w-20 sm:w-24 h-4 sm:h-6 bg-gray-700 rounded animate-pulse mx-auto sm:mx-0"></div>
        </div>
        <div className="w-full h-2 sm:h-3 bg-gray-800 rounded-full overflow-hidden">
          <div className="w-1/4 h-full bg-gray-600 animate-pulse"></div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-800">
          {/* Step Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-600 rounded-full"></div>
            </div>
            <div className="w-48 sm:w-64 h-6 sm:h-8 bg-gray-800 rounded mx-auto mb-2 animate-pulse"></div>
            <div className="w-36 sm:w-48 h-4 sm:h-5 bg-gray-700 rounded mx-auto animate-pulse"></div>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-800 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gray-700 rounded-full animate-pulse"></div>
            </div>
            
            {/* Form Fields */}
            <div className="flex-1 space-y-4 w-full">
              <div className="w-full h-3 sm:h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-full h-10 sm:h-12 bg-gray-800 rounded-lg animate-pulse"></div>
              <div className="w-full h-20 sm:h-24 bg-gray-800 rounded-lg animate-pulse"></div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="w-28 sm:w-32 h-8 sm:h-10 bg-gray-700 rounded animate-pulse"></div>
                <div className="w-40 sm:w-48 h-3 sm:h-4 bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-800 space-y-3 sm:space-y-0">
          <div className="w-20 sm:w-24 h-8 sm:h-10 bg-gray-800 rounded-lg animate-pulse order-2 sm:order-1"></div>
          <div className="w-28 sm:w-32 h-8 sm:h-10 bg-gray-700 rounded-lg animate-pulse order-1 sm:order-2"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoader;
