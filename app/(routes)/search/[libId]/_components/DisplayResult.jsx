
// 'use client';
// import React, { useEffect, useState } from 'react';
// import { LucideImage, LucideList, LucideSparkle, LucideVideo, ArrowUpRight } from 'lucide-react';
// import AnswerDisplay from './AnswerDisplay';
// import axios from 'axios';
// import { useParams } from 'next/navigation';
// import { createClient } from '@supabase/supabase-js'; // Import createClient

// // Supabase Initialization
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

// const tabs = [
//   { label: 'Answer', icon: LucideSparkle },
//   { label: 'Images', icon: LucideImage },
//   { label: 'Video', icon: LucideVideo },
//   { label: 'Source', icon: LucideList, badge: 10 },
// ];

// function DisplayResult({ SearchInputRecord }) {
//   const [activeTab, setActiveTab] = useState('Answer');
//   const [searchResult, setSearchResult] = useState(null);
//   const { libId } = useParams();

//   useEffect(() => {
// // SearchInputRecord?.Chats?.length == 0 && getSearchApiResult();
// // setSearchResult(SearchInputRecord);
// // console.log("SearchInputRecord:", SearchInputRecord);
//     if (SearchInputRecord) {
//       getSearchApiResult();
//       setSearchResult(SearchInputRecord);
//  console.log("SearchInputRecord:", SearchInputRecord);
//     }
//   }, [SearchInputRecord]);

//   const getSearchApiResult = async () => {
//   try {
//     const result = await axios.post('/api/brave-search-api', {
//       searchInput: SearchInputRecord?.searchInput,
//       searchType: SearchInputRecord?.type,
//     });

//     const formattedSearchResp = result.data?.web?.results?.map(item => ({
//       title: item?.title,
//       description: item?.description,
//       long_name: item?.profile?.long_name,
//       img: item?.profile?.img,
//       url: item?.url,
//       thumbnail: item?.thumbnail?.src,
//       original: item?.thumbnail?.original
//     }));

//     console.log("Formatted API result:", formattedSearchResp);

//     // Save formattedSearchResp to Supabase instead of result.data
//     const { data, error } = await supabase
//       .from('Chats')
//       .insert([
//         {
//           libId: libId,
//           searchResult: formattedSearchResp, // ✅ Save formatted result
//           userSearchInput: SearchInputRecord?.searchInput,
//          // rawApiResponse: result.data // optional: save full response
//         },
//       ])
//       .select();

//     if (error) throw error;

//     setSearchResult(formattedSearchResp);

//     await generateAIResp(formattedSearchResp, data[0].id);
//   } catch (error) {
//     console.error("Search error:", error);
//   }
// };


//   // const getSearchApiResult = async () => {
//   //   //setLoadingSearch(true);
//   //   try {
//   //     const result = await axios.post('/api/brave-search-api', {
//   //       searchInput: SearchInputRecord?.searchInput,
//   //       searchType: SearchInputRecord?.type,
//   //     });

//   //     const formattedSearchResp = result.data?.web?.results?.map(item => ({
//   //      title: item?.title,
//   //       description: item?.description,
//   //       long_name: item?.profile?.long_name,
//   //       img: item?.profile?.img,
//   //       url: item?.url,
//   //       thumbnail: item?.thumbnail?.src,
//   //       original: item?.thumbnail?.original
//   //     }));

//   //     console.log("API result:", result.data);
//   //     setSearchResult(result.data); // Fixed typo here (setsearchResult -> setSearchResult)

//   //     // Insert into Supabase
//   //     const { data, error,id } = await supabase
//   //       .from('Chats')
//   //       .insert([
//   //         {
//   //           libId: libId,
//   //           searchResult: result.data,
            
//   //         },
//   //       ])
//   //       .select();

//   //     if (error) throw error;
      
//   //     //await getSearchRecords();
//   //     await generateAIResp(result.data, data[0].id);
//   //   } catch (error) {
//   //     console.error("Search error:", error);
//   //   } finally {
//   //    // setLoadingSearch(false);
//   //   }
//   // };



//  const generateAIResp = async (searchData, recordId) => {
//     try {
//       const result = await axios.post('/api/llm-model', {
//         searchInput: SearchInputRecord?.searchInput,
//         searchResult: searchData,
//         recordId: recordId
//       });
// console.log(result.data);
//       const runId = result.data;

//       const interval = setInterval(async () => {
//         const runResp = await axios.post('/api/get-inngest-status', {
//           runId: runId
//         });

//         if (runResp?.data?.data?.status == 'Completed') {
//           console.log("Completed")
//          // console.log("LLM response:", runResp.data.data.result);

//           clearInterval(interval);
//           //await getSearchRecords();
//         }
//       }, 1000)
//     } catch (error) {
//       console.error("AI response error:", error);
//     }
//   };


//   return (

// <div className="mt-7">
//   {searchResult?.Chats?.map((chat, index) => (
//     <div key={index}>
//       <div className="flex items-center space-x-6 border-b border-gray-200 pb-2 mt-6">
//         {tabs.map(({ label, icon: Icon, badge }) => (
//           <button
//             key={label}
//             onClick={() => setActiveTab(label)}
//             className={`flex items-center gap-1 relative text-sm font-medium hover:text-black ${
//               activeTab === label ? 'text-black' : 'text-gray-700'
//             }`}
//           >
//             <Icon className="w-4 h-4" />
//             <span>{label}</span>
//             {badge && (
//               <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 rounded">
//                 {badge}
//               </span>
//             )}
//             {activeTab === label && (
//               <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-black rounded" />
//             )}
//           </button>
//         ))}

//         <div className="ml-auto text-sm text-gray-500 flex items-center">
//           1 Task
//           <ArrowUpRight className="ml-1 w-4 h-4" />
//         </div>
//       </div>

//       <div>
//         <AnswerDisplay 
//           activeTab={activeTab} 
//           searchResult={searchResult}
//           userQuery={SearchInputRecord?.searchInput}
//         />
//       </div>
//     </div>
//   ))}
// </div>
    
//   );
// }

// export default DisplayResult;

'use client';
import React, { useEffect, useState } from 'react';
import { LucideImage, LucideList, LucideSparkle, LucideVideo, ArrowUpRight ,Send} from 'lucide-react';
import AnswerDisplay from './AnswerDisplay';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import ImageListTab from './ImageListTab';
import SourceListTab from './SourceListTab';
import { Button } from '@/components/ui/button';


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const tabs = [
  { label: 'Answer', icon: LucideSparkle },
  { label: 'Images', icon: LucideImage },
  { label: 'Video', icon: LucideVideo },
  { label: 'Source', icon: LucideList, badge: 10 },
];

function DisplayResult({ SearchInputRecord }) {
  const [activeTab, setActiveTab] = useState('Answer');
  const [searchResults, setSearchResults] = useState([]);
  const { libId } = useParams();
const [loadingSearch, setLoadingSearch] = useState(false);
const [userInput, setUserInput] = useState();


  useEffect(() => {
    const loadChats = async () => {
      try {
        // First load existing chats
        const { data, error } = await supabase
          .from('Chats')
          .select('*')
          .eq('libId', libId)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data.length > 0) {
          setSearchResults(data.map(chat => ({
            searchResult: chat.searchResult,
            userSearchInput: chat.userSearchInput,
            id: chat.id
          })));
        }

        // If we have a new search, add it
        if (SearchInputRecord) {
          getSearchApiResult();
        }
      } catch (error) {
        console.error("Error loading chats:", error);
      }
    };

    loadChats();
  }, [SearchInputRecord, libId]);

  const getSearchApiResult = async () => {
setLoadingSearch(true);

    try {
     const result = await axios.post('/api/brave-search-api', {
            searchInput: userInput ?? SearchInputRecord?.searchInput,
            searchType: SearchInputRecord?.type ?? 'Search'
        });


      const formattedSearchResp = result.data?.web?.results?.map(item => ({
        title: item?.title,
        description: item?.description,
        long_name: item?.profile?.long_name,
        img: item?.profile?.img,
        url: item?.url,
        thumbnail: item?.thumbnail?.src,
        original: item?.thumbnail?.original
      }));

      const { data, error } = await supabase
        .from('Chats')
        .insert([{
          libId: libId,
          searchResult: formattedSearchResp,
          userSearchInput: SearchInputRecord?.searchInput
        }])
        .select();

      if (error) throw error;

      // Add the new chat to existing results
      setSearchResults(prev => [{
        searchResult: formattedSearchResp,
        userSearchInput: SearchInputRecord?.searchInput,
        id: data[0].id
      }, ...prev]);
 await  GetSearchRecords();
      await generateAIResp(formattedSearchResp, data[0].id);
    } catch (error) {
      console.error("Search error:", error);
    }
    setLoadingSearch(false);
    
  };

  const generateAIResp = async (searchData, recordId) => {
    try {
      const result = await axios.post('/api/llm-model', {
        searchInput: SearchInputRecord?.searchInput,
        searchResult: searchData,
        recordId: recordId
      });

      const runId = result.data;
      const interval = setInterval(async () => {
        const runResp = await axios.post('/api/get-inngest-status', {
          runId: runId
        });

        if (runResp?.data?.data?.status === 'Completed') {
          clearInterval(interval);
         await  GetSearchRecords();
          setSearchResults(prev => prev.map(chat => 
            chat.id === recordId 
              ? { ...chat, aiResp: runResp.data.data.result } 
              : chat
          ));
        }
      }, 1000);
    } catch (error) {
      console.error("AI response error:", error);
    }
  };

   
const GetSearchRecords = async () => {
  const { data: Library, error } = await supabase
    .from('Library')
    .select('*,Chats(*)')
    .eq('libId', libId)
    .order('id', { foreignTable: 'Chats', ascending: true });

  if (error) {
    console.error("GetSearchRecords error:", error);
    return;
  }

  if (Library && Library[0]?.Chats) {
    const chatsArray = Library[0].Chats.map(chat => ({
      searchResult: chat.searchResult,
      userSearchInput: chat.userSearchInput,
      id: chat.id,
      aiResp: chat.aiResponse || chat.aiResp // Handle both cases
    }));

    setSearchResults(chatsArray);
  }
};


  return (
    <div className="mt-7">
{!searchResults?.Chats &&
 <div className="mb-6">

 <div className="w-full h-5 bg-accent animate-pulse rounded-md"></div>
                <div className="w-1/2 mt-2 h-5 bg-accent animate-pulse rounded-md"></div>
                <div className="w-[70%] mt-2 h-5 bg-accent animate-pulse rounded-md"></div>
                    </div>} 

      {searchResults.map((chat, index) => (
        <div key={chat.id || index} className="mb-8">
          <h2 className="font-bold text-4xl text-gray-600 mb-4">
             {chat.userSearchInput}
            {/* {chat.userSearchInput || SearchInputRecord?.searchInput} */}
          </h2>
          
          <div className="flex items-center space-x-6 border-b border-gray-200 pb-2 mt-6">
            {tabs.map(({ label, icon: Icon, badge }) => (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className={`flex items-center gap-1 relative text-sm font-medium hover:text-black ${
                  activeTab === label ? 'text-black' : 'text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                {badge && (
                  <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 rounded">
                    {badge}
                  </span>
                )}
                {activeTab === label && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-black rounded" />
                )}
              </button>
            ))}

            <div className="ml-auto text-sm text-gray-500 flex items-center">
              1 Task
              <ArrowUpRight className="ml-1 w-4 h-4" />
            </div>
          </div>

                  <div>
                        {activeTab == 'Answer' ?
                            <AnswerDisplay 
                 chat={chat.searchResult}
  activeTab={activeTab}
  userQuery={chat.userSearchInput}
  aiResp={chat.aiResp}  // Make sure this matches the state property
  loadingSearch={loadingSearch}
            />:
                            activeTab == 'Images' ? <ImageListTab chat={chat} />
                                : activeTab == 'Source' ?
                                    <SourceListTab chat={chat} /> :null
                                   
                        }
                    </div>
          <hr className="my-5 "/>
        </div>




      ))}





{/* <div className='bg-white w-full border rounded-lg 
    shadow-md p-3 px-5 flex justify-between fixed bottom-6 left-1/2 -translate-x-1/2 max-w-sm'>
                <input placeholder='Type Anything...' className='outline-none w-full'
                    onChange={(e) => setUserInput(e.target.value)} value={userInput}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            getSearchApiResult(); // replace this with your actual function
                        }
                    }} />
                {userInput && <Button onClick={getSearchApiResult} disabled={loadingSearch}>
                    {loadingSearch ? <Loader2Icon className='animate-spin' /> : <Send />}</Button>}
            </div> */}


    </div>
  );
}

export default DisplayResult;