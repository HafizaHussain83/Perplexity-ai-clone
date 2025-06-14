"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from './_components/Header';
import { supabase } from '@/services/supasbase';
import DisplayResult from './_components/DisplayResult';


function SearchQueryResult() {
  const { libId } = useParams();
  const [SearchInputRecord, setSearchInputRecord] = useState(null);

  useEffect(() => {
    GetSearchQueryRecord();
  }, []);

const GetSearchQueryRecord = async () => {

        let { data: Library, error } = await supabase
            .from('Library')
            .select('*,Chats(*)')
            .eq('libId', libId);

      console.log(Library[0])
       setSearchInputRecord(Library[0]);
    }


  // const GetSearchQueryRecord = async () => {
  //   let { data: Library, error } = await supabase
  //     .from('Library')
  //     .select('*')
  //     .eq('libId', libId);

  //   if (error) {
  //     console.error("Supabase error:", error.message);
  //   } else {
  //     console.log("Library data:", Library[0]);
  //     setSearchInputRecord(Library[0]);
  //   }
  // };



  return (
    <div>
      <Header SearchInputRecord={SearchInputRecord} />
      <div className=' px-10 mid:px-20 lg:px-36 xl:px-56 mt-20'>
              <DisplayResult SearchInputRecord={SearchInputRecord}/>

      </div>
    </div>
  );
}

export default SearchQueryResult;
