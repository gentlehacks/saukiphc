"use client"
import {useRouter} from 'next/navigation'
import {motion} from "framer-motion";
import { FaSpinner } from 'react-icons/fa6'

const NewPatientActionBtn = ({adding}: {adding: boolean}) => {
  const route = useRouter()

  return (
    <div className="w-full flex items-center justify-end gap-4 mt-[1.5rem]">
      <motion.button 
        onClick={() => route.push("/dashboard")}
      className='px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-bg duration-200 ease-in-out'
      initial={{scale: 1}}
      whileHover={{scale: [1, 1.1]}}
      whileTap={{scale: [0.9, 1.1, 1]}}
      transition={{duration: 0.2}}
      >
        Cancel
      </motion.button>
      <motion.button 
        type="submit"
      className='px-4 py-2 flex items-center bg-blue-500 hover:bg-blue-600 rounded-lg transition-bg duration-100 ease-in-out'
       initial={{scale: 1}}
       whileHover={{scale: [1, 1.1]}}
       whileTap={{scale: [0.9, 1.1, 1]}}
       transition={{duration: 0.2}}
      >
        {adding ? 'Creating' : 'Create'}
        {adding && (
          <motion.div
            animate={{rotate: 360}}
            transition={{duration: 0.3, repeat: Infinity}}
          className="flex items-center justify-center ml-3"
          >
            <FaSpinner />
          </motion.div>
        )}
      </motion.button>
      
    </div>
  )
}

export default NewPatientActionBtn