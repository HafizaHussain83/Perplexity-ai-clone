// import React from 'react';

// function ImageListTab({ images }) {
//   // Safely handle the incoming images prop
//   const safeImages = Array.isArray(images) ? images : [];

//   // Show fallback if no images available
//   if (safeImages.length === 0) {
//     return <div className="text-gray-400 mt-6">No images found</div>;
//   }

//   return (
//     <div className="flex gap-5 flex-wrap mt-6">
//       {safeImages.map((item, index) => (
//         <img
//           key={index}
//           src={item?.original}
//           alt={item?.title || `Image ${index + 1}`}
//           width={200}
//           height={200}
//           onClick={() => window.open(item.original, '_blank')}
//           onError={(e) => {
//             e.target.style.display = 'none';
//           }}
//           className="bg-accent rounded-xl object-contain w-[200px] h-full cursor-pointer"
//         />
//       ))}
//     </div>
//   );
// }

// export default ImageListTab;



import React, { useState } from 'react';

function ImageItem({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="w-[200px] h-[200px] relative rounded-xl overflow-hidden bg-gray-100">
      {/* Loader / Skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
      )}

      {/* Actual Image */}
      {!error && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          onClick={() => window.open(src, '_blank')}
          className={`object-cover w-full h-full cursor-pointer transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Fallback if image fails */}
      {error && (
        <div className="flex items-center justify-center w-full h-full text-sm text-gray-400">
          Image not available
        </div>
      )}
    </div>
  );
}

function ImageListTab({ images }) {
  const safeImages = Array.isArray(images) ? images : [];

  if (safeImages.length === 0) {
    return <div className="text-gray-400 mt-6">No images found</div>;
  }

  return (
    <div className="flex gap-5 flex-wrap mt-6">
      {safeImages.map((item, index) => (
        <ImageItem
          key={index}
          src={item?.original}
          alt={item?.title || `Image ${index + 1}`}
        />
      ))}
    </div>
  );
}

export default ImageListTab;




// import React from 'react';

// function ImageListTab({ chat }) {
//     return (
//         <div className='flex gap-5 flex-wrap mt-6'>
//             {chat.searchResult.map((item, index) => (
//                 <img
//                     src={item?.original}
//                     alt={item.title}
//                     width={200}
//                     height={200}
//                     key={index}
//                     onClick={() => window.open(item.original, '_blank')}
//                     onError={(e) => {
//                         e.target.style.display = 'none'; // ❌ Hide image if it fails to load
//                     }}
//                     className='bg-accent rounded-xl object-contain w-[200px] h-full cursor-pointer'
//                 />
//             ))}
//         </div>
//     );
// }

// export default ImageListTab;
