"use client"
import { AppState } from "@/store";
import {motion} from "framer-motion";
import Link from "next/link";

interface PatientCard {

  patientId: string;
  name: string;
  cost: number,
  
}

const PatientCard = ({
  patientId,
  name,
  cost,
}: PatientCard) => {

  const {appTheme} = AppState()

  return (
   <Link href={`/dashboard/${patientId}`}
   >
   <motion.div className={`flex items-center justify-between p-3 rounded-lg shadow-md   transition-bg duration-200 ease-in-out
      ${appTheme ? 'bg-gray-900 hover:bg-gray-800 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}
    `}
      initial={{opacity: 0, x: "50px"}}
      whileInView={{opacity: 1, x: 0}}
      whileTap={{scale: [0.9, 1.1, 1]}}
      exit={{opacity: 0, x: "50px"}}
      transition={{duration: 0.2}}
    >
      <motion.div className="flex items-center">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center w-[3rem] h-[3rem] rounded-full overflow-hidden border">
            <span className="text-lg font-bold uppercase">
              {name[0]}
            </span>
          </div>
        </div>
        <div className="items-center ml-[1rem]">
          <p className="text-lg font-semibold">
            {name}
          </p>
        </div>
      </motion.div>

      <div className="flex items-center">
        <div className="items-center">
          <span className={`text-lg text-gray-300
            ${appTheme ? 'text-gray-300' : 'text-gray-600'}
          `}>
            ₦{cost}
          </span>
        </div>
      </div>
    </motion.div>
    </Link>
  )
}

export default PatientCard