//UI
"use client";
import {motion} from "framer-motion"
import { AppState } from '@/store';
import {useRouter} from "next/navigation"
import NewPatientActionBtn from '@/components/NewPatientActionBtn'
import { IoIosArrowBack } from 'react-icons/io'
import { useState } from "react";
import { createPatient } from "@/actions/patients/create-patient";
import Toaster from "@/components/Toaster";

type FormData = {
  name: string;
  address: string;
  gender: string;
  age: string | number;
  description: string;
  diseases: string;
  injections: string;
  cost: string | number;
  paid: string | number;
};

const NewPatienPage = () => {
  const {appTheme} = AppState()
  const route = useRouter();
  const [adding, setAdding] = useState<boolean>(false);
  const [toaster, setToaster] = useState<boolean>(false);
  const [toasterMessage, setToasterMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    gender: 'Male',
    age: '',
    description: '',
    diseases: '',
    injections: '',
    cost: '',
    paid: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true)
    try {
      await createPatient(formData);
      setToaster(true);
      setToasterMessage("Patient added Succesfully!");
      setIsSuccess(true);
      setFormData({
        name: '',
        address: '',
        gender: '',
        age: '',
        description: '',
        diseases: '',
        injections: '',
        cost: '',
        paid: '',
      });
      setTimeout(() => {
        setToaster(false);
        setToasterMessage("");
        setIsSuccess(null);
      }, 5000)
    } catch (error) {
      setToaster(true);
      setToasterMessage("Failed to add Patient!");
      setIsSuccess(false)
      setTimeout(() => {
        setToaster(false);
        setToasterMessage("");
        setIsSuccess(null);
      }, 5000)
      console.log("Error: ", error);
    }
    setAdding(false)
  }

  return (
    <div className={`relative w-full h-full sm:w-[70%] mx-auto
      ${appTheme ? 'bg-gray-900' : 'bg-gray-100'}
    `}>
      <div className={`w-full h-full 
      ${appTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}
    `}>
      <motion.div className="flex items-center pt-[1rem]      overflow-hidden" 
        initial={{x: '15px', scale: 0.8}}
        animate={{x: 0, scale: 1}}
        transition={{duration: 1}}
      >
        <div 
          onClick={() => route.back()} 
        className="flex items-center cursor-pointer"
        >
          <IoIosArrowBack className="text-gray-300 hover:text-blue-600 text-xl ml-2" />
          <h2 className="ml-2 text-lg">Back</h2>
        </div>
      </motion.div>
      <div className="flex w-full items-left px-4 pt-[2rem] mb-[1.5rem]"
      >
        <motion.h1 className="text-3xl font-semibold"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 1}}
        >
          New Patient?
        </motion.h1>
      </div>

      <div className="w-full px-4 flex flex-col pb-[3.5rem]">
        <form onSubmit={handleSubmit}>
          {/* User Information */}
          <motion.div className="w-full "
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1}}
          >
            <div className="w-full flex flex-col space-y-3">
              <div className="flex flex-col items-left ">
                <label className="text-md font-medium mb-1">name:</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Patient full-name" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 duration-200"
                  required
                />
              </div>
              <div className="w-full flex flex-col items-left">
                <label className="text-md font-medium mb-1">address:</label>
                <input 
                  list="address"
                  type="address" 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Patient address." 
                  className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 duration-200"
                  required
                />
                <datalist id="address">
                  <option value="Makera"></option>
                </datalist>
              </div>
              <div className="w-full flex items-center justify-between gap-4">
                <div className="w-full flex flex-col items-left">
                <label className="text-md font-medium mb-1">age:</label>
                <input
                  list="age" 
                  type="number" 
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: +e.target.value})}
                  placeholder="Age" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 duration-200"
                  required
                />
                <datalist id="age">
                  <option value="5"></option>
                  <option value="7"></option>
                  <option value="9"></option>
                  <option value="10"></option>
                  <option value="15"></option>
                  <option value="20"></option>
                </datalist>
              </div>
              <div className="w-full flex flex-col items-left">
                <label className="text-md font-medium mb-1">gender:</label>
                <select 
                  name="gender" 
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  required
                  className={`px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 duration-200
                    ${appTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}
                  `}
                 >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
               </div>
              </div>
              
            </div>
          </motion.div>

           {/* Clinic Research */}
           <motion.div className="flex flex-col mt-[2rem] space-y-3 mb-[1rem]"
             initial={{opacity: 0}}
             animate={{opacity: 1}}
             transition={{duration: 1, delay: 1}}
           >
            <div className="flex flex-col items-left">
              <label className="text-md font-medium mb-1">Injections</label>
              <input 
                list="injections"
                type="text"
                value={formData.injections}
                  onChange={(e) => setFormData({...formData, injections: e.target.value})}
                placeholder="e.g paracetamol, diclofenac, athemeter (Optional)"
                className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 duration-200"
              />
              <datalist id="injections">
                <option value="paracetamol"></option>
                <option value="gentamycin"></option>
                <option value="diclofenac"></option>
                <option value="Athemeter"></option>
              </datalist>
            </div>
            <div className="flex flex-col items-left">
              <label className="text-md font-medium mb-1">diseases</label>
              <input 
                list="diseases"
                type="text"
                value={formData.diseases}
                  onChange={(e) => setFormData({...formData, diseases: e.target.value})}
                placeholder="e.g malaria, ulcer, cough..."
                className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 duration-200"
                required
              />
              <datalist id="diseases">
                <option value="Malaria"></option>
                <option value="Ulcer"></option>
                <option value="Dirrhoe"></option>
                <option value="Fever"></option>
              </datalist>
            </div>
            <div className="flex flex-col items-left">
              <label className="text-md font-medium mb-1">description</label>
              <input 
                type="textarea"
                value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="(Optional)." 
                className="w-full min-h-[3rem] max-h-[5.5rem] px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 duration-200"

              />
            </div>

            <div className="w-full flex items-center justify-between gap-3">
                <div className="flex flex-col items-left">
                  <label className="text-md font-medium mb-1">cost:</label>
                  <div className="relative">
                    <div className="absolute left-3 top-2">
                      <h1 className='text-2xl text-gray-400'>₦</h1>
                    </div>
                    <input 
                      list="cost"
                      type="number"
                      value={formData.cost}
                      onChange={(e) => setFormData({...formData, cost: +e.target.value})}
                      placeholder="Treatment cost"
                      className="w-full px-4 pl-8 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 duration-200"
                      required
                    />
                  <datalist id="cost">
                    <option value="700"></option>
                    <option value="100"></option>
                    <option value="1500"></option>
                    <option value="2000"></option>
                    <option value="3000"></option>
                  </datalist>
                 </div>
                </div>
                <div className="flex flex-col items-left">
                  <label className="text-md font-medium mb-1">paid:</label>
                  <div className="relative">
                    <div className="absolute left-3 top-2">
                      <h1 className='text-2xl text-gray-400'>₦</h1>
                    </div>
                    <input 
                    type="number"
                    value={formData.paid}
                    onChange={(e) => setFormData({...formData, paid: +e.target.value})}
                    placeholder="amount paid"
                    className="w-full px-4 pl-8 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 duration-200"
                    required
                  />
                 </div>
                </div>
            </div>
            

           </motion.div>

            <NewPatientActionBtn adding={adding} />

          </form>
        </div>
      </div>

       {toaster && (
        <Toaster 
          message={toasterMessage}
          isSuccess={isSuccess}
        />
       )}           

    </div>
    
  )
}

export default NewPatienPage