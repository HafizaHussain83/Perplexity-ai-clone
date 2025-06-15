


'use client';

import Image from 'next/image';
import React from 'react';

function SourceListTab({ sources = [], loadingSearch }) {
  const safeSources = Array.isArray(sources) ? sources : [];

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

  if (safeSources.length === 0) {
    return (
      <div className="mt-5 text-center text-gray-500">
        No sources available.
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-4">
      {safeSources.map((item, index) => (
        <div key={index}>
          <div className="flex gap-2 items-center">
            <h2>{index + 1}.</h2>
            {item.img && (
              <Image
                src={item.img}
                alt={item.title || 'Source image'}
                width={20}
                height={20}
                className="rounded-full w-[20px] h-[20px] border"
              />
            )}
            <div>
              <h2 className="text-xs">{item.long_name || 'Unknown Source'}</h2>
            </div>
          </div>

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 font-bold text-lg text-gray-600 hover:underline block line-clamp-1"
          >
            {item.title || item.url}
          </a>

          <p className="mt-1 text-xs text-gray-600">
            {item.description || 'No description available.'}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SourceListTab;
