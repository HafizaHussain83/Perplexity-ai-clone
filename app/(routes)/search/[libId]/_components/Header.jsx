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


