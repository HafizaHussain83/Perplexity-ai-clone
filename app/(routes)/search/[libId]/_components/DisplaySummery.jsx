


// 'use client';
// import React from 'react';
// import ReactMarkdown from 'react-markdown';
// import rehypeRaw from 'rehype-raw';

// function DisplaySummery({ aiResp }) {
//     // Debug the incoming prop
//     console.log('[DisplaySummery] Received aiResp:', aiResp);
    
//     /**
//      * Normalizes the AI response content to ensure proper display
//      * @returns {string} Markdown content to render
//      */
//     const getNormalizedContent = () => {
//         if (!aiResp) return null;
        
//         // Handle string responses
//         if (typeof aiResp === 'string') {
//             return aiResp.trim();
//         }
        
//         // Handle object responses
//         if (typeof aiResp === 'object') {
//             // Check for common response formats
//             if (aiResp.aiResp) return aiResp.aiResp;
//             if (aiResp.response) return aiResp.response;
//             if (aiResp.content) return aiResp.content;
            
//             // Fallback to stringification
//             return JSON.stringify(aiResp, null, 2);
//         }
        
//         return null;
//     };

//     const content = getNormalizedContent();

//     // Markdown component configuration
//     const markdownComponents = {
//         h1: ({ node, ...props }) => (
//             <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 mt-6 leading-snug" {...props} />
//         ),
//         h2: ({ node, ...props }) => (
//             <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-3 mt-5 leading-snug" {...props} />
//         ),
//         h3: ({ node, ...props }) => (
//             <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 mt-4 mb-2 leading-tight" {...props} />
//         ),
//         p: ({ node, ...props }) => (
//             <p className="text-gray-700 leading-relaxed mb-4 text-base" {...props} />
//         ),
//         a: ({ node, ...props }) => (
//             <a
//                 className="text-blue-600 hover:text-blue-800 underline transition-colors"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 {...props}
//             />
//         ),
//         ul: ({ node, ...props }) => (
//             <ul className="list-disc list-inside space-y-1.5 mb-4 pl-5" {...props} />
//         ),
//         ol: ({ node, ...props }) => (
//             <ol className="list-decimal list-inside space-y-1.5 mb-4 pl-5" {...props} />
//         ),
//         li: ({ node, ordered, ...props }) => (
//             <li className="mb-1.5" {...props} />
//         ),
//         blockquote: ({ node, ...props }) => (
//             <blockquote className="bg-gray-50 border-l-4 border-gray-300 italic p-4 pl-6 text-gray-600 mb-6" {...props} />
//         ),
//         table: ({ node, ...props }) => (
//             <div className="overflow-x-auto mb-6 rounded-lg border border-gray-200">
//                 <table className="min-w-full divide-y divide-gray-200" {...props} />
//             </div>
//         ),
//         th: ({ node, ...props }) => (
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />
//         ),
//         td: ({ node, ...props }) => (
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-t border-gray-200" {...props} />
//         ),
//         code: ({ node, inline, className, children, ...props }) => {
//             const match = /language-(\w+)/.exec(className || '');
//             return !inline && match ? (
//                 <div className="bg-gray-800 rounded-md mb-4 overflow-hidden">
//                     <div className="px-4 py-2 text-xs text-gray-300 bg-gray-900 flex justify-between items-center">
//                         <span>{match[1]}</span>
//                     </div>
//                     <pre className="p-4 overflow-x-auto text-sm text-gray-100">
//                         <code {...props}>{children}</code>
//                     </pre>
//                 </div>
//             ) : (
//                 <code className="bg-gray-100 text-sm px-1.5 py-0.5 rounded font-mono text-red-600" {...props}>
//                     {children}
//                 </code>
//             );
//         },
//         img: ({ node, ...props }) => (
//             <div className="my-4 rounded-lg overflow-hidden border border-gray-200">
//                 <img 
//                     className="max-w-full h-auto mx-auto" 
//                     {...props} 
//                     onError={(e) => {
//                         e.target.style.display = 'none';
//                     }}
//                 />
//             </div>
//         )
//     };

//     return (
//         <div className="mt-7 w-full">
//             {!content ? (
//                 <div className="mb-6 animate-pulse space-y-2">
//                     <div className="w-full h-5 bg-gray-200 rounded-md"></div>
//                     <div className="w-4/5 h-5 bg-gray-200 rounded-md"></div>
//                     <div className="w-3/4 h-5 bg-gray-200 rounded-md"></div>
//                 </div>
//             ) : (
//                 <div className="prose prose-sm sm:prose-base max-w-none">
//                     <ReactMarkdown
//                         rehypePlugins={[rehypeRaw]}
//                         components={markdownComponents}
//                         skipHtml={false}
//                     >
//                         {content}
//                     </ReactMarkdown>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default DisplaySummery;

'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Loader2 } from 'lucide-react';

function DisplaySummary({ aiResp, loading }) {
  // Function to safely get markdown content
  const getMarkdownContent = () => {
    if (!aiResp) return '';
    if (typeof aiResp === 'string') return aiResp;
    if (typeof aiResp === 'object') {
      // Handle different object structures
      if (aiResp.text) return aiResp.text;
      if (aiResp.content) return aiResp.content;
      return JSON.stringify(aiResp, null, 2);
    }
    return String(aiResp);
  };

  const content = getMarkdownContent();

  return (
    <div className="mt-4 max-w-full overflow-hidden">
      {loading ? (
        <div className="space-y-2 animate-pulse">
          <div className="w-full h-4 bg-gray-200 rounded"></div>
          <div className="w-4/5 h-4 bg-gray-200 rounded"></div>
          <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
        </div>
      ) : content ? (
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-2xl font-bold text-gray-800 mt-6 mb-4" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-xl font-semibold text-gray-800 mt-5 mb-3" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="text-gray-700 mb-3 leading-relaxed" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a 
                  className="text-blue-600 hover:text-blue-800 underline" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  {...props} 
                />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-5 space-y-1 mb-3" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-5 space-y-1 mb-3" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="mb-1" {...props} />
              ),
              code: ({ node, inline, className, children, ...props }) => (
                <code 
                  className={`${inline ? 'bg-gray-100 px-1 py-0.5 rounded text-sm' : 'block bg-gray-800 text-white p-3 rounded my-2 overflow-x-auto'} ${className || ''}`} 
                  {...props}
                >
                  {children}
                </code>
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-3" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="text-gray-500 italic flex items-center gap-2">
          <Loader2 className="animate-spin h-4 w-4" />
          No summary available yet
        </div>
      )}
    </div>
  );
}

export default DisplaySummary;