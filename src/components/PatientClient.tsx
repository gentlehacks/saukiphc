"use client"
import { AppState } from "@/store";
import {motion} from "framer-motion";
import { useState} from "react";
import {useRouter} from "next/navigation";
import { format } from 'date-fns';
import { IoIosArrowBack } from "react-icons/io";
import DeletePatientModal from "@/components/DeletePatientModal";
import { FaLocationDot, FaCheck } from "react-icons/fa6";
import { Patient } from "@/actions/patients/types";

const PatientClient = ({patient}: {patient: Patient}) => {
  const {appTheme} = AppState();
  const route = useRouter();

  const [deletePatientModal, setDeletePatientModal] = useState<boolean>(false);

  const formattedDate = format(new Date(patient.created_at), 'dd-MM-yyyy');
  const formattedTime = format(new Date(patient.created_at), 'h:mm a');
  

  return (
  <div className={`relative w-full h-full sm:w-[65%] mx-auto p-4 pb-[2rem] flex flex-col
    ${appTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}
  `}> 

    {/* Header */}
    <div className="w-full fixed top-0 left-0 mx-auto p-3 flex items-center justify-center shadow-md bg-[rgba(0,0,0,0.3)]">
      <motion.div className="absolute left-2" 
        initial={{ scale: 0.8}}
        animate={{scale: 1}}
        transition={{duration: 1}}
      >
        <IoIosArrowBack 
          onClick={() => route.push('/dashboard')}
        className="text-gray-300 hover:text-blue-600 text-2xl cursor-pointer ml-2" />
      </motion.div>
      <h1 className="text-2xl font-semibold">Patient Record</h1>
    </div>

    <motion.div className="w-full flex items-center mt-[5rem] mr-[1rem] overflow-hidden"
      initial={{y: "-15px", opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{duration: 0.5}}
    >
      {/* Patient Icon */}
      <div className="flex items-center justify-center w-[5rem] h-[5rem] rounded-full border border-blue-500 overflow-hidden">
        <h1 className="text-3xl font-bold uppercase">
          {patient?.name[0]}
        </h1>
      </div>
      <div className="ml-6 flex flex-col items-center justify-center">
        <h1 className="text-3xl text-center font-medium">
          {patient?.name}
        </h1>
        <p className="text-2xl flex items-center mt-2 mr-[1.5rem]">
          <FaLocationDot className="text-blue-600 text-center text-1xl mr-3" />
          {patient?.address}
        </p>
      </div>
    </motion.div>

    {/* Personal Information */}
    <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 mt-[2rem]">Personal Information</h3>

    <div className="p-4 grid grid-cols-2">
      <div className="flex flex-col gap-1 border-t border-solid border-t-[#345165] py-4 pr-2">
        <p className="text-gray-500 text-sm font-normal leading-normal">Address</p>
        <p className="text-sm font-normal leading-normal">{patient.address}</p>
      </div>
      <div className="flex flex-col gap-1 border-t border-solid border-t-[#345165] py-4 pl-2">
        <p className="text-gray-500 text-sm font-normal leading-normal">Gender</p>
        <p className="text-sm font-normal leading-normal">{patient.gender}</p>
      </div>
      <div className="flex flex-col gap-1 border-t border-solid border-t-[#345165] py-4 pr-2">
        <p className="text-gray-500 text-sm font-normal leading-normal">Age</p>
        <p className="text-sm font-normal leading-normal">{patient.age}</p>
      </div>
    </div>
    
    <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Medical History</h3>
    <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#345165] py-5">
        <p className="text-gray-500 text-sm font-normal leading-normal">Diseases</p>
        <p className="text-sm font-normal leading-normal letter-spacing-[0.5rem]">{patient.diseases}</p>
      </div>
      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#345165] py-5">
        <p className="text-gray-500 text-sm font-normal leading-normal">Injections</p>
        <p className="text-sm font-normal leading-normal letter-spacing-[0.5rem]">{patient.injections}</p>
      </div>
    </div>

    <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Visit Details</h3>
    <div className="p-4 grid grid-cols-2">
      <div className="flex flex-col gap-1 border-t border-solid border-t-[#345165] py-4 pr-2">
        <p className="text-gray-500 text-sm font-normal leading-normal">Date</p>
        <p className="text-sm font-normal leading-normal">{formattedDate}</p>
      </div>
      <div className="flex flex-col gap-1 border-t border-solid border-t-[#345165] py-4 pl-2">
        <p className="text-gray-500 text-sm font-normal leading-normal">Time</p>
        <p className="text-sm font-normal leading-normal">{formattedTime}</p>
      </div>
      <div className="flex flex-col gap-1 border-t border-solid border-t-[#345165] py-4 pr-2">
        <p className="text-gray-500 text-sm font-normal leading-normal">Description</p>
        <p className="text-sm font-normal leading-normal">{patient.description}</p>
      </div>
      <div className="flex flex-col gap-1 border-t border-solid border-t-[#345165] py-4 pl-2">
        <p className="text-gray-500 text-sm font-normal leading-normal">Cost</p>
        <p className="text-sm font-normal leading-normal">₦{patient.cost}</p>
      </div>
      <div className="flex flex-col gap-1 border-t border-solid border-t-[#345165] py-4 pr-2 col-span-2 pr-[50%]">
        <p className="text-gray-500 text-sm font-normal leading-normal">Payment Status</p>
        <p className="text-sm font-normal leading-normal">
          {patient.paid < patient.cost ? (
            <span>paid ₦{patient.paid}</span>
          ) : (
            <span className="flex items-center">
              Paid 
              <FaCheck className="text-green-500 ml-[1rem]" />
            </span>
          )}
        </p>
      </div>
    </div>

    
    {/* Action Buttons */}
    <div className="flex items-center justify-end mt-[2.5rem]">
      <button 
        onClick={() => setDeletePatientModal(true)}
        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-bg duration-200 ease-in-out cursor-pointer mr-3"
       >
        Delete
      </button>
      <button  
        onClick={() => route.push(`/dashboard/${patient.id}/update`)}
      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-bg duration-200 ease-in-out cursor-pointer">
        Update
      </button>
    </div>

    {/* Delete Patient Modal */}
    {deletePatientModal && (
      <DeletePatientModal 
        patientId={patient.id}
        deletePatientModal={deletePatientModal}
        setDeletePatientModal={setDeletePatientModal}
      />
    )}

  </div>
  )
}

export default PatientClient