import React from 'react';

function VideoListTab({ videos }) {
  if (!videos || videos.length === 0) {
    return <div className="text-gray-500 mt-4">No video results found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {videos.map((video, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden border p-4">
          <a href={video.url} target="_blank" rel="noopener noreferrer">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="mt-3 text-lg font-bold text-blue-700 hover:underline">
              {video.title}
            </h3>
          </a>
          <p className="text-gray-600 text-sm mt-1">{video.description}</p>
          <p className="text-xs text-gray-400 mt-1">Published: {video.age}</p>
        </div>
      ))}
    </div>
  );
}

export default VideoListTab;
