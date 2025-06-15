'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function SourceList({ webResult = [], loadingSearch = false }) {
  // Ensure webResult is always an array
  const safeWebResult = Array.isArray(webResult) ? webResult : [];

  if (loadingSearch) {
    return (
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              <div className="w-32 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-3 bg-gray-300 rounded"></div>
              <div className="w-5/6 h-3 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (safeWebResult.length === 0) {
    return (
      <div className="mt-5 text-center text-gray-500">
        No sources available
      </div>
    );
  }

  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {safeWebResult.slice(0, 5).map((item, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
          <Link href={item?.url || '#'} target="_blank" className="block">
            <div className="flex items-center gap-2 mb-2">
              {item?.img && (
                <Image
                  src={item.img}
                  alt={item?.long_name || 'Logo'}
                  width={16}
                  height={16}
                  className="rounded-full"
                />
              )}
              <h2 className="text-xs font-medium text-gray-700">
                {item?.long_name || 'Unknown Source'}
              </h2>
            </div>
            <p className="line-clamp-2 text-black text-xs">
              {item?.description || 'No description available'}
            </p>
          </Link>
        </div>
      ))}
      
    </div>
  );
}

export default SourceList;