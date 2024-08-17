import React from 'react';

function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-4 ">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div className="w-48 h-6 bg-gray-300 rounded"></div>
      </div>
      <div className="w-full h-24 bg-gray-300 rounded"></div>
      
      <div>
        <h3 className="font-semibold mb-2">Social Links</h3>
        <div className="flex space-x-4 mb-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
        <div className="flex space-x-2">
          <div className="flex-1 h-10 bg-gray-300 rounded"></div>
          <div className="w-16 h-10 bg-blue-300 rounded"></div>
        </div>
      </div>

      <button className="w-full h-12 bg-blue-300 rounded"></button>

      <div>
        <h3 className="font-semibold mb-2">Skills</h3>
        <div className="flex space-x-2 mb-4">
          <div className="flex-1 h-10 bg-gray-300 rounded"></div>
          <div className="w-16 h-10 bg-blue-300 rounded"></div>
        </div>
      </div>

      <button className="w-full h-12 bg-blue-300 rounded"></button>
    </div>
  );
}

export default SkeletonLoader;
