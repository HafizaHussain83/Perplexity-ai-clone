import { UserButton } from '@clerk/nextjs';
import { Badge, Clock, Icon, Send } from 'lucide-react';
import React from 'react';
import  moment from 'moment';
import { Button } from '@/components/ui/button';

function Header({ SearchInputRecord }) {
  if (!SearchInputRecord) {
    return (
      <div className="p-4">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className='p-4 border-b flex justify-between items-center' >
      <div className='flex gap-2 items-ceter'  > 
        <UserButton />
        <div className='flex gap-1 items-ceter'>
          <Clock className='h-5 w-5 mt-1 text-gray-500 ' />
          <h2 className=' text-sm  text-gray-500 mt-1 '>{moment(SearchInputRecord.created_at).fromNow()}</h2>
        </div>
      </div>
<h2 className='line-clamp-1 max-w-md'>{SearchInputRecord?.searchInput}</h2>

      {/* <h2 className='line-clamp-1 max-w-md '>{SearchInputRecord?.SearchInput}</h2> */}
      <div className='flex gap-3'>
        <Button>Link</Button>
         <Button><Send/>Link</Button>
      </div>
    </div>
  );
}

export default Header;


{/* <div className='flex items-center space-x-6 border-bborder-gray-200 pb-2 mt-6'>
  {tabs.map(({label,icon:Icon,Badge})=>(
    <button
    key={label}
    onClick={()=>setActiveTab(label)}
    className={'flex items-center gap-1 relative text-sm font-medium text-gray-700 hover:text-black ${activeTap===label? 'text-black':""}
      }'}
   
   >
<icon className='w-4 h-4'/>
<span>{label}</span>
{Badge &&(<span className='ml-1 text-xs bg-gray-100text-gray-600 px-1.5 rounded'>
  {Badge}
  </span>
)}
{acttiveTab===label&&(
  <spaan className='absolute-bottom-2 left-0 w-full h-0.5 bg-black rounded'></spaan>
)}

    </button>
  ))}

</div> */}