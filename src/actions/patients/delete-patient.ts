
import { supabase } from "../../../lib/supabase";

export async function deletePatient(id: string): Promise<boolean> {

  const { error } = await supabase
    .from('patients')
    .delete()
    .eq('id', id)

  if (error) {
    // console.error('Delete error: ', error);
    return false;
  }

  return true;
}