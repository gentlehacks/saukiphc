"use client"
import {AppState} from "@/store"
import {motion, AnimatePresence} from "framer-motion"
import {useState} from "react"
import { IoIosArrowBack } from "react-icons/io"

interface ChangePasswordModalProps {
  changePsdModal: boolean;
  setChangePsdModal: (changePsdModal: boolean) => void;
}

const ChangePasswordModal = ({
  changePsdModal,
  setChangePsdModal
}: ChangePasswordModalProps) => {

  const {appTheme} = AppState();
  const [confirmNewPsd, setConfirmNewPsd] = useState<boolean>(false)

  return (
    <AnimatePresence>
      <div 
        onClick={() => setChangePsdModal(!changePsdModal)}
      className="fixed flex justify-center bottom-0 inset-0 bg-[rgba(0,0,0,0.3)] opacity-bg-30 w-full h-screen">
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className={`mx-auto w-full max-w-lg sm:w-[35rem] h-[95%] rounded-lg p-4 shadow-t-lg absolute bottom-0
            ${appTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}
          `}
          initial={{opacity: 0.5, y: "100%"}}
          animate={{opacity: 1, y: "0"}}
          exit={{opacity: 0.5, y: "100%"}}
          transition={{duration: 0.3}}
        >
          <div 
            onClick={() => setChangePsdModal(!changePsdModal)}
          className="flex items-center mt-4 cursor-pointer">
            <IoIosArrowBack className="mr-2" />
            Back
          </div>

          <h1 className="mt-5 text-2xl font-semibold">
            Enter New Password.
          </h1>

          <div>
            <div className="flex flex-col items-left mt-8">
            <label className="text-xm font-medium mb-1">new password</label>
              <input 
                type="text" 
                name="newpassword"
                placeholder="Enter a new Password."
                className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
              />
              <div className="mt-3">

              </div>
              <div className="w-full flex items-center justify-center mt-6 mx-auto">
                <button 
                  onClick={() => setConfirmNewPsd(!confirmNewPsd)}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-bg duration-200 ease-in-out cursor-pointer">
                  Change
                </button>
              </div>
            </div>
          </div>

          {confirmNewPsd && (
          <div className="fixed top-0 bg-[rgba(0,0,0,0.4)] w-full h-screen inset-0 flex items-center justify-center"
            onClick={() => setConfirmNewPsd(!confirmNewPsd)}
          >
            <motion.div className={`absolute max-w-lg w-[85%] mx-auto p-5 rounded-xl shadow-xl flex flex-col items-center justify-center
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
              <h1 className="mt-5 text-lg font-semibold">
                Do you want to Change Password?
              </h1>
              <p className="mt-3 text-center">
                Your password will changed to the new password provided!
              </p>
              <div className="w-full mt-7 flex items-center justify-between">
              <button 
                onClick={() => setChangePsdModal(!changePsdModal)}
                className={`px-4 py-2 shadow-sm rounded-lg transition-bg duration-200
                  ${appTheme 
                    ? 'bg-gray-900 hover:bg-gray-800 ' 
                    : 'bg-gray-200 hover:bg-gray-300 '}
                `}>
              No, Cancel
              </button>
              <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-bg duration-200">
                Yes, Change
              </button>
              </div>
            </motion.div>
          </div>
          
          )}


        </motion.div>
      </div>
      
    </AnimatePresence>
  )
}

export default ChangePasswordModal