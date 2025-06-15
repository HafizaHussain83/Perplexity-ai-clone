import React from 'react';
import SourceList from './SourceList';
import DisplaySummery from './DisplaySummery';

function AnswerDisplay({ chat, activeTab, userQuery, aiResp, loadingSearch }) {
  const safeChat = Array.isArray(chat) ? chat : [];
  
  return (
    <div>
      {activeTab === 'Answer' && (
        <div className='mt-5'>
          <SourceList webResult={safeChat} loadingSearch={loadingSearch} />
          <DisplaySummery aiResp={aiResp} />
        </div>
      )}
    </div>
  );
}


 export default AnswerDisplay;



























// import React from 'react'

// function AnswerDisplay() {
//   return (
//     // <div>AnswerDisplay</div>
// {activeTab === 'Answer' && searchResult?.web?.results?.length > 0 && (
//   <div className="mt-6 space-y-4">
//     {searchResult.web.results.map((item, index) => (
//       <div key={index} className="border p-4 rounded-md hover:bg-gray-50">
//         <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold">
//           {item.title}
//         </a>
//         <p className="text-sm text-gray-600">{item.description}</p>
//         <span className="text-xs text-gray-400">{item.url}</span>
//       </div>
//     ))}
//   </div>
// )}




//   )
// }

// export default AnswerDisplay





// import React from 'react';
// import { ArrowUpRight } from 'lucide-react';

// function AnswerDisplay({ activeTab, searchResult }) {
//   if (!searchResult) {
//     return (
//       <div className="flex justify-center items-center h-48">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
//       </div>
//     );
//   }

//   if (activeTab === 'Answer') {
//     return (
//       <div className="mt-8 space-y-8">
//         {searchResult.web?.results?.map((item, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 cursor-pointer group"
//           >
//             <a
//               href={item.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-indigo-700 text-2xl font-semibold hover:underline flex items-center gap-2"
//               title={item.title}
//             >
//               {item.title}
//               <ArrowUpRight className="w-5 h-5 text-indigo-500 group-hover:text-indigo-700 transition-colors" />
//             </a>
//             <p className="mt-3 text-gray-700 text-lg leading-relaxed line-clamp-4">
//               {item.description || "No description available."}
//             </p>
//             <span className="mt-4 block text-sm text-gray-400 break-all">{item.url}</span>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (activeTab === 'Images') {
//     return (
//       <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//         {searchResult.mixed?.main
//           .filter(item => item.type === 'image')
//           .map((item, index) => (
//             <div
//               key={index}
//               className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 cursor-pointer"
//               title={item.title || 'Image'}
//             >
//               <img
//                 src={item.url}
//                 alt={item.title || 'Image'}
//                 className="object-cover w-full h-56"
//                 loading="lazy"
//               />
//               {item.title && (
//                 <div className="bg-indigo-600 text-white p-2 text-sm font-medium truncate">
//                   {item.title}
//                 </div>
//               )}
//             </div>
//           ))}
//       </div>
//     );
//   }

//   if (activeTab === 'Video') {
//     return (
//       <div className="mt-8 space-y-8">
//         {searchResult.videos?.results?.map((item, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 cursor-pointer group"
//           >
//             <a
//               href={item.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-indigo-700 text-2xl font-semibold hover:underline flex items-center gap-2"
//               title={item.title}
//             >
//               {item.title}
//               <ArrowUpRight className="w-5 h-5 text-indigo-500 group-hover:text-indigo-700 transition-colors" />
//             </a>
//             <p className="mt-3 text-gray-700 text-lg leading-relaxed line-clamp-3">
//               {item.description || "No description available."}
//             </p>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (activeTab === 'Source') {
//     return (
//       <div className="mt-8 space-y-6">
//         {searchResult.web?.results?.map((item, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer"
//           >
//             <div className="text-gray-700 font-medium truncate max-w-[80%]">
//               Source:{" "}
//               <a
//                 href={item.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-indigo-600 hover:underline"
//                 title={item.domain || item.url}
//               >
//                 {item.domain || item.url}
//               </a>
//             </div>
//             <ArrowUpRight className="w-5 h-5 text-indigo-500" />
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return null;
// }

// export default AnswerDisplay;


