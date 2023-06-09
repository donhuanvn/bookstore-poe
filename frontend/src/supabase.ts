
import { createClient } from '@supabase/supabase-js'

if (process.env.NODE_ENV === "development") {
  console.log("Supabase Project URL:", process.env.REACT_APP_SUPABASE_URL)
  console.log("Supabase Project Anon Key:", process.env.REACT_APP_SUPABASE_KEY)
}

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL as string, process.env.REACT_APP_SUPABASE_KEY as string)


export default supabase
