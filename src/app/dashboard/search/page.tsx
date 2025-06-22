"use client";
import PatientCard from '@/components/PatientCard'
import { AppState } from '@/store'
import {motion} from "framer-motion"
import {useRouter} from "next/navigation"
import { useState, useEffect } from "react"
import { BiSearch } from 'react-icons/bi'
import { IoIosArrowBack } from 'react-icons/io'
import { supabase } from '../../../../lib/supabase'
import { Patient } from '@/actions/patients/types'

const SearchPage = () => {
  const {appTheme} = AppState()
  const route = useRouter()

  const [patients, setPatients] = useState<Patient[] | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const {data} = await supabase
          .from('patients')
          .select('*')
        setPatients(data);
      } catch (error) {
        console.log("Error fecthing Patients :", error);
      }
    }

    fetchPatients();
  }, []);

  const [searchQuery, setSearchQuery] = useState<string>("")
  const filteredPatients = patients?.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));


  return (
    <div className={`mx-auto w-screen sm:w-[65%] h-screen p-4
      ${appTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}
    `}>
      <div className={`w-full h-full
        ${appTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}
     `}>

      {/* Search Field */}
      <div className="w-full flex items-center">
        <div 
          onClick={() => route.back()} 
          className="flex items-center cursor-pointer"
         >
          <IoIosArrowBack 
            className="text-gray-300 hover:text-blue-600 text-xl mr-2" 
            title="back" 
          />
        </div>
        <motion.div className="w-full flex items-center relative overflow-hidden"
          initial={{width: "5rem"}}
          animate={{width: "100%"}}
          transition={{duration: 1}}
        >
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search a patient."
          className="w-full px-4 pl-8 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <div className="absolute left-2">
          <BiSearch className="text-gray-400 text-xl" />
        </div>
        </motion.div>
      </div>

      <div className="mt-4 ml-4">
        <h1>
          Result: &quot;{filteredPatients?.length}&quot;
        </h1>
      </div>


      {/* Mached Searches */}
      <div className="flex flex-col w-full h-full mt-[2rem] overflow-hidden">
        <ul className="space-y-2">
          {filteredPatients?.map((patient) => (
            <PatientCard 
              key={patient.id}
              patientId={String(patient.id)}
              name={patient.name}
              cost={patient.cost}
            />
          ))}
          
          
          {/* {filteredPatient.lenght < 1 && (
            <p className="text-md font-light">
              Patient not found!
            </p>
          )} */}
          
        </ul>
      </div>
      
      </div>
    </div>
  )
}

export default SearchPage