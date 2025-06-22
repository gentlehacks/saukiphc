import { supabase } from "../../../lib/supabase";


export async function createPatient(patient: {
  name: string;
  address: string;
  gender: string;
  age: string | number;
  description: string;
  diseases: string;
  cost: string | number;
  paid: string | number;
}) {
  const {data, error} = await 
    supabase
      .from('patients')
      .insert(patient)
      .select()
      .single()
    if (error) {
      // console.log("Create patient Error: ", error);
      throw new Error(error.message);
    };

    // console.log('Created patient: ', data)
    return data;
}