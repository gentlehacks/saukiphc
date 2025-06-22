"use client"
import {AppState} from "@/store"
import Image from "next/image";
import { FaHospitalUser } from "react-icons/fa6";

const PatientListHeader = () => {

  const {appTheme} = AppState();

  return (
    <section className={`w-full shadow-lg mb-[2rem]
      ${appTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}
    `}>
      <div className="w-full p-5 flex items-center justify-between">
        <div className="flex items-center" >
          <div className="flex items-center justify-center rounded-full overflow-hidden border border-blue-600 w-10 h-10 sm:w-15 sm:h-15">
            <Image 
              src="../public/logo.PNG"
              alt="sauki phc clinic logo" 
              width={150} 
              height={150} 
              className="w-[130%]" 
            />
          </div>
          <h2 className="ml-5 text-xl sm:text-3xl text-blue-500 font-semibold uppercase">Sauki PHC Clinic</h2>
        </div>
        
        <div className="flex items-center">
          <FaHospitalUser size={25} />
        </div>
      </div>
    </section>
  )
}

export default PatientListHeader