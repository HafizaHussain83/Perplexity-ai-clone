"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SearchCheck,
  Atom,
  AudioLines,
  Cpu,
  Globe,
  Paperclip,
  Mic,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from '@/services/supasbase';
import { v4 as uuidv4 } from 'uuid';
import { AIMaodelsOptions } from "@/services/Shared";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; 


function ChatInputBox() {
  const [mounted, setMounted] = useState(false);
  const [searchType, setSearchType] = useState("search");
  const { user } = useUser();
  const [userSearchInput, setUserSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router=useRouter();

  const onSearchQuery = async () => {
    try {
      setLoading(true);
      const libId = uuidv4();

      const { data, error } = await supabase.from("Library").insert([
        {
          searchInput: userSearchInput,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          type: searchType,
          libId: libId,
        },
      ]).select();

    router.push('/search/'+libId)
      if (error) {
         router.push('/search/'+libId)
        console.error("Insert error:", error.message);
      } else {
        console.log("Inserted record:", data[0]);
      }
    } catch (error) {
  if (error.response) {
    console.error("API error response data:", error.response.data);
    console.error("API error status:", error.response.status);
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Error setting up request:", error.message);
  }
  console.error("Full error object:", error);
}
 finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col h-screen items-center justify-center w-full">
      <Image
        src="/logo.png"
        alt="Logo"
        width={150}
        height={50}
        style={{ width: "auto", height: "auto" }}
        priority
      />

      <div className="p-2 mt-2 w-full max-w-2xl border rounded-xl">
        <Tabs defaultValue="Search" className="w-full">
          <TabsContent value="Search">
            <input
              type="text"
              placeholder="Ask Anything......"
              onChange={(e) => setUserSearchInput(e.target.value)}
              className="p-2 w-full outline-none"
            />
          </TabsContent>

          <TabsContent value="Research">
            <input
              type="text"
              placeholder="Research Anything..."
              onChange={(e) => setUserSearchInput(e.target.value)}
              className="p-2 w-full outline-none"
            />
          </TabsContent>

          <div className="flex items-center justify-between pt-2">
            <TabsList className="flex">
              <TabsTrigger
                value="Search"
                className="text-primary"
                onClick={() => setSearchType("search")}
              >
                <SearchCheck /> Search
              </TabsTrigger>
              <TabsTrigger
                value="Research"
                className="text-primary"
                onClick={() => setSearchType("research")}
              >
                <Atom /> Research
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-4">
              {mounted && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button>
                      <Cpu className="text-gray-500 h-5 w-5 mt-1" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {AIMaodelsOptions.map((Model, index) => (
                      <DropdownMenuItem key={index}>
                        <div className="mb-1">
                          <h2 className="text-sm font-medium">{Model.name}</h2>
                          <p className="text-xs text-gray-500">{Model.description}</p>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <Globe className="text-gray-500 h-5 w-5" />
              <Paperclip className="text-gray-500 h-5 w-5" />
              <Mic className="text-gray-500 h-5 w-5" />
              <Button onClick={() => userSearchInput && onSearchQuery()} disabled={loading}>
                {!userSearchInput ? (
                  <AudioLines className="text-white h-5 w-5" />
                ) : (
                  <ArrowRight className="text-white h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default ChatInputBox;




// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   SearchCheck,
//   Atom,
//   AudioLines,
//   Cpu,
//   Globe,
//   Paperclip,
//   Mic,
//   ArrowRight,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { supabase } from '@/services/supasbase';
// import { v4 as uuidv4 } from 'uuid';



// import { AIMaodelsOptions } from "@/services/Shared";
// import { useUser } from "@clerk/nextjs";
// // import { uuid } from "uuidv4";

// function ChatInputBox() {


//   const [mounted, setMounted] = useState(false);
//   const [searchType,setsearchType]=useState('search');
//    const { user } = useUser();  
//   const [userSearchInput,setuserSearchInput]=useState();
//   const [loading, setLoading] = useState(false); 

//   const onSearchQuery=async()=>{
//    setloading(true);
// const libId = uuidv4();

//     const {data}=await supabase.from('Library').insert([
//       {
//                 searchInput:userSearchInput,
//         userEmail:user?.primaryEmailAddress.emailAddress,
//         type:searchType,
//         libId:libId
//       }
//     ]).select();
//      setloading(false);
//     console.log(data[0]);
   
//   }

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <div className="flex flex-col h-screen items-center justify-center w-full">
//       <Image
//         src="/logo.png"
//         alt="Logo"
//         width={150}
//         height={50}
//         style={{ width: "auto", height: "auto" }}
//         priority
//       />

//       <div className="p-2 mt-2 w-full max-w-2xl border rounded-xl">
//         <Tabs defaultValue="Search" className="w-full">
//           <TabsContent value="Search">
//             <input
//               type="text"
//               placeholder="Ask Anything......"  onChange={(e)=>setuserSearchInput(e.target.value,)}
//               className="p-2 w-full outline-none"
//             />
//           </TabsContent>

//           <TabsContent value="Research">
//             <input
//               type="text"
//               placeholder="Research Anything..." onChange={(e)=>setuserSearchInput(e.target.value,)}

//               className="p-2 w-full outline-none"
//             />
//           </TabsContent>

//           <div className="flex items-center justify-between pt-2">
//             <TabsList className="flex">
//               <TabsTrigger value="Search" className="text-primary" onClick={()=>setsearchType('search')} >
//                 <SearchCheck /> Search
//               </TabsTrigger>
//               <TabsTrigger value="Research" className="text-primary" onClick={()=>setsearchType('research')} >
//                 <Atom /> Research
//               </TabsTrigger>
//             </TabsList>

//             <div className="flex items-center gap-4">
//               {mounted && (
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <button>
//                       <Cpu className="text-gray-500 h-5 w-5 mt-2" />
//                     </button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent>
//                     {AIMaodelsOptions.map((Model, index) => (
//                       <DropdownMenuItem key={index}>
//                         <div className="mb-1">
//                           <h2 className="text-sm font-medium">{Model.name}</h2>
//                           <p className="text-xs text-gray-500">
//                             {Model.description}
//                           </p>
//                         </div>
//                       </DropdownMenuItem>
//                     ))}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               )}

//               <Globe className="text-gray-500 h-5 w-5" />
//               <Paperclip className="text-gray-500 h-5 w-5" />
//               <Mic className="text-gray-500 h-5 w-5" />
//               <Button  onClick={()=>{
//                 userSearchInput?onSearchQuery():null
//               }}>
//                 {!userSearchInput?<AudioLines className="text-white h-5 w-5" />
//                 :<ArrowRight className="text-white h-5 w-5"  disabled={loading}/>}
//               </Button>
//             </div>
//           </div>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

// export default ChatInputBox;
