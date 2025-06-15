

'use client';
import React, { useEffect, useState } from 'react';
import { LucideImage, LucideList, LucideSparkle, LucideVideo, ArrowUpRight ,Send,Loader2} from 'lucide-react';
import AnswerDisplay from './AnswerDisplay';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import ImageListTab from './ImageListTab';
import SourceListTab from './SourceListTab';
import { Button } from '@/components/ui/button';
import VideoListTab from './VideoListTab';


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

// const getSearchApiResult = async () => {
//   setLoadingSearch(true);

//   try {
//     const result = await axios.post('/api/brave-search-api', {
//       searchInput: userInput ?? SearchInputRecord?.searchInput,
//       searchType: SearchInputRecord?.type ?? 'Search'
//     });

//     // Web results
//     const webResults = result.data?.web?.results || [];

//     const formattedWebResults = webResults.map(item => ({
//       title: item?.title,
//       description: item?.description,
//       long_name: item?.profile?.long_name,
//       img: item?.profile?.img,
//       url: item?.url,
//       thumbnail: item?.thumbnail?.src,
//       original: item?.thumbnail?.original
//     }));

//     // ✅ Video results
//     const videoResults = result.data?.videos?.results || [];

//     const formattedVideoResults = videoResults.map(video => ({
//       title: video?.title,
//       url: video?.url,
//       description: video?.description,
//       age: video?.age,
//       thumbnail: video?.thumbnail,
//       source: video?.source
//     }));

//     // ✅ Insert both into Supabase
//     const { data, error } = await supabase
//       .from('Chats')
//       .insert([{
//         libId: libId,
//         userSearchInput: SearchInputRecord?.searchInput,
//         searchResult: {
//           web: formattedWebResults,
//           video: formattedVideoResults
//         }
//       }])
//       .select();

//     if (error) throw error;

//     setSearchResults(prev => [{
//       searchResult: {
//         web: formattedWebResults,
//         video: formattedVideoResults
//       },
//       userSearchInput: SearchInputRecord?.searchInput,
//       id: data[0].id
//     }, ...prev]);

//     await GetSearchRecords();
//     await generateAIResp(formattedWebResults, data[0].id);
//   } catch (error) {
//     console.error("Search error:", error);
//   }

//   setLoadingSearch(false);
// };

const getSearchApiResult = async () => {
  setLoadingSearch(true);

  const currentSearchInput = userInput ?? SearchInputRecord?.searchInput;

  try {
    const result = await axios.post('/api/brave-search-api', {
      searchInput: currentSearchInput,
      searchType: SearchInputRecord?.type ?? 'Search'
    });

    const webResults = result.data?.web?.results || [];
    const formattedWebResults = webResults.map(item => ({
      title: item?.title,
      description: item?.description,
      long_name: item?.profile?.long_name,
      img: item?.profile?.img,
      url: item?.url,
      thumbnail: item?.thumbnail?.src,
      original: item?.thumbnail?.original
    }));

    const videoResults = result.data?.videos?.results || [];
    const formattedVideoResults = videoResults.map(video => ({
      title: video?.title,
      url: video?.url,
      description: video?.description,
      age: video?.age,
      thumbnail: video?.thumbnail,
      source: video?.source
    }));

    // Insert to Supabase
    const { data, error } = await supabase
      .from('Chats')
      .insert([{
        libId: libId,
        userSearchInput: currentSearchInput,
        searchResult: {
          web: formattedWebResults,
          video: formattedVideoResults
        }
      }])
      .select();

    if (error) throw error;

    setSearchResults(prev => [{
      searchResult: {
        web: formattedWebResults,
        video: formattedVideoResults
      },
      userSearchInput: currentSearchInput,
      id: data[0].id
    }, ...prev]);

    await GetSearchRecords();
    await generateAIResp(formattedWebResults, data[0].id, currentSearchInput);
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
        
        // Update the record in Supabase
        const { error } = await supabase
          .from('Chats')
          .update({ aiResp: runResp.data.data.result })
          .eq('id', recordId);
        
        if (error) throw error;
        
        await GetSearchRecords();
      }
    }, 1000);
  } catch (error) {
    console.error("AI response error:", error);
  }
};

   
const GetSearchRecords = async () => {
  const { data: Library, error } = await supabase
    .from('Library')
    .select('*, Chats(*)')
    .eq('libId', libId)
    .order('created_at', { foreignTable: 'Chats', ascending: false });

  if (error) {
    console.error("GetSearchRecords error:", error);
    return;
  }

  if (Library && Library[0]?.Chats) {
    const chatsArray = Library[0].Chats.map(chat => ({
      searchResult: chat.searchResult,
      userSearchInput: chat.userSearchInput,
      id: chat.id,
      aiResp: chat.aiResp // Make sure this matches your DB column
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
  {activeTab === 'Answer' ? (
    <AnswerDisplay 
      chat={chat.searchResult?.web || []}
      activeTab={activeTab}
      userQuery={chat.userSearchInput}
      aiResp={chat.aiResp}
      loadingSearch={loadingSearch}
    />
  ) : activeTab === 'Images' ? (
      <ImageListTab images={chat.searchResult?.web || []} /> 
  ) : activeTab === 'Source' ? (
    <SourceListTab sources={chat.searchResult?.web || []} />
  ) : activeTab === 'Video' ? (
    <VideoListTab videos={chat.searchResult?.video || []} />
  ) : null}
</div>

          <hr className="my-5 "/>
        </div>




      ))}





<div className='bg-white w-full border rounded-lg 
    shadow-md p-3 px-5 flex justify-between fixed bottom-6 left-[60%] -translate-x-1/2  max-w-2xl'>
                <input placeholder='Type Anything...' className='outline-none w-full'
                    onChange={(e) => setUserInput(e.target.value)} value={userInput}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            getSearchApiResult(); // replace this with your actual function
                        }
                    }} />
                {userInput && <Button onClick={getSearchApiResult} disabled={loadingSearch}>
                    {loadingSearch ? <Loader2 className='animate-spin w-5 h-5' /> : <Send className="w-5 h-5" />}
   </Button>}
            </div>


    </div>
  );
}

export default DisplayResult;


