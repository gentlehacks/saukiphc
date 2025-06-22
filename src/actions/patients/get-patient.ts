
import { supabase } from "../../../lib/supabase";
import { Patient } from "./types";

export async function getPatientById(id: string): Promise<Patient | null> {
  // console.log("Fetching patient with ID: ", id);

  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    // console.error('Supabase error: ', error.message, error.details);
    return null;
  }

  // console.log("Found patient: ", data);
  return data;
}