"use client"
import { AppState } from "@/store";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckDouble } from "react-icons/fa6";
import { MdOutlineError } from "react-icons/md";


const Toaster = ({message, isSuccess}: {
  message: string, 
  isSuccess: boolean | null
}) => {
  const {appTheme} = AppState()

  return (
    <AnimatePresence>
      <motion.div
        initial={{x: "-100%", scale: 0.8, opacity: 0.8}}
        animate={{x: "0", scale: 1, opacity: 1}}
        exit={{x: "-100%", scale: 0.8, opacity: 0.8}}
        transition={{duration: 0.2}}
      className={`fixed top-2 right-4 flex items-center rounded-lg p-3 border
        ${appTheme ? 'bg-gray-800 text-white border-gray-600' : "bg-gray-200 text-gray-900 border-gray-400"}  
      `}>
        <div className="mr-3 flex">
          {isSuccess === true ? (
            <FaCheckDouble className="text-xl text-blue-500" />
          ) : isSuccess === false && (
            <MdOutlineError className="text-xl text-red-400" />
          )}
        </div>
        <p className="text-md">
          {message}
        </p>
      </motion.div>
    </AnimatePresence>
  )
}

export default Toaster