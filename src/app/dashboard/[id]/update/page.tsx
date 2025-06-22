import { getPatientById } from "@/actions/patients/get-patient";
import UpdatePatientForm from "@/components/UpdatePatientForm";


const UpdatePatient = async ({params}: {params: {id: string}}) => {
  const {id} = params;
  
  const patient = await getPatientById(id);

  if (!patient) return (
    <div className="w-full h-full flex items-center justify-center">
      Patient not found
    </div>
  );

  return <UpdatePatientForm patient={patient} />
}

export default UpdatePatient