// import { createClient } from '@supabase/supabase-js'

// // Create a single supabase client for interacting with your database
//  export const supabase = createClient(process.env.NEXT_SUPABASE_PUBLIC_URL, 
//     NEXT_SUPABASE_PUBLIC_KEY)



import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
