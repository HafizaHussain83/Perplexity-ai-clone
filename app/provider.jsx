"use client";

import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supasbase';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';


export default function Provider({ children }) {
  const { user } = useUser();
  const[userDetail,setUserDetail]=useState();

  useEffect(() => {
    if (user) {
      createNewUser();
    }
  }, [user]);

  const createNewUser = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;

    //if user already exist
    const { data: users, error: selectError } = await supabase
      .from('Users')
      .select('*')
      .eq('email', email);

    if (selectError) {
      console.error("Error checking user:", selectError);
    
      return;
    }

    // If not found, insert new user
    if (users.length === 0) {
      const { data: insertData, error: insertError } = await supabase
        .from('Users')
        .insert([
          {
            name: user?.fullName,
            email,
          },
        ]);

      if (insertError) {
        console.error("Error inserting user:", insertError);
      } else {
        console.log("User inserted:", insertData);
      }
    } else {
      console.log("User already exists:", users);
    }
  };

  return (
    <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
      <div className='w-full'>{children}</div>
    </UserDetailContext.Provider>
    
    );
}


  // setUserDetail(data[0]);