import { supabase } from "../../../lib/supabase";
import { Patient } from "./types";

export async function getPatients(): Promise<Patient[]> {
  const {data, error} = await 
  supabase
    .from('patients')
    .select('*')
    .order('created_at', {ascending: false})
  
    if (error) {
      // console.log('Error Supabase Error: ', error);
      // throw new Error(error.message);
    }
    // console.log("Fetched Patients:", data)
  return data || [];
}