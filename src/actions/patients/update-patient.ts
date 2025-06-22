import { supabase } from "../../../lib/supabase";
import { Patient } from "./types";

export async function updatePatient(
  id: string,
  updates: Partial<Patient>
): Promise<Patient | null> {
  const {data, error} = await supabase
    .from('patients')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      // console.log("Update error: ", error);
      return null;
    }

    return data as Patient;
}