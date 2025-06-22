"use client";
import { deletePatient } from "@/actions/patients/delete-patient";
import { AppState } from "@/store";
import {motion} from "framer-motion";
import { useRouter } from "next/navigation";
import {useState} from "react"
import { FaSpinner } from "react-icons/fa6";

interface DeletePatientModalProp {
  patientId: string;
  deletePatientModal: boolean;
  setDeletePatientModal: (deletePatientModal: boolean) => void;
}

const DeletePatientModal = ({
  patientId,
  deletePatientModal,
  setDeletePatientModal,
}: DeletePatientModalProp) => {

  const router = useRouter()
  const {appTheme} = AppState();
  const [deleting, setDeleting] = useState<boolean>(false)


  const handleDeletePatient = async () => {
    setDeleting(true);
    try {
      await deletePatient(patientId);
      router.push("/dashboard");
    } catch (error) {
      console.log("Error deleting patient", error);
      setDeleting(false)
    }
  };


 

  return (
    <div className="fixed top-0 bg-[rgba(0,0,0,0.4)] w-full h-screen inset-0 flex items-center justify-center"
        onClick={() => setDeletePatientModal(!deletePatientModal)}
      >
        <motion.div className={`absolute w-[85%] max-w-lg mx-auto p-5 rounded-xl shadow-xl flex flex-col items-center justify-center
          ${appTheme 
            ? 'bg-black text-white' 
            : 'bg-white text-gray-900'}
        `}
          onClick={(e) => e.stopPropagation()}
          initial={{scale: 0.5, opacity: 0.5}}
          animate={{scale: 1, opacity: 1}}
          exit={{scale: 0.5, opacity: 0.5}}
          transition={{duration: 0.2,}}
      >  
          <div className="flex items-center justify-center bg-gray-400">   

          </div>
          <h1 className="mt-5 text-2xl text-center font-semibold">
            Are you Sure to delete this patient?
          </h1>
          <p className="mt-3 text-center">
            This process is not reverseable!
          </p>
          <div className="w-full mt-7 flex items-center justify-between">
          <button 
            onClick={() => setDeletePatientModal(!deletePatientModal)}
            className={`px-4 py-2 cursor-pointer shadow-sm rounded-lg transition-bg duration-200
              ${appTheme 
                ? 'bg-gray-900 hover:bg-gray-800 ' 
                : 'bg-gray-200 hover:bg-gray-300 '}
            `}>
          No, Cancel
          </button>
          <button 
            onClick={handleDeletePatient}
          className="px-4 py-2 cursor-pointer flex items-center rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-200">
            Yes, Delete
            {deleting && (
              <motion.div
                animate={{rotate: 360}}
                transition={{duration: 0.3, repeat: Infinity, repeatType: "loop"}}
              className="flex items-center justify-center  ml-2"
              >
                <FaSpinner />
              </motion.div>
              
            )}
          </button>
          </div>
        </motion.div>
      </div>
  )
}

export default DeletePatientModal