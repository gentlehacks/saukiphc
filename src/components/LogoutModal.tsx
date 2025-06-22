"use client";
import { AppState } from "@/store";
import {motion} from "framer-motion";
import {useState} from "react"
import { FaSpinner } from "react-icons/fa6";
import { supabase } from "../../lib/supabase";

interface Props {
  setLogoutModal: (logoutModal: boolean) => void;
}

const LogoutModal = ({
  setLogoutModal
}: Props) => {

  const {appTheme} = AppState();
  const [loginOut, setLoginOut] = useState<boolean>(false)

  const handleLogout = async () => {
    setLoginOut(true)
    await supabase.auth.signOut();
    window.location.href = '/login';
  }
 

  return (
    <div className="fixed top-0 bg-[rgba(0,0,0,0.4)] w-full h-screen inset-0 flex items-center justify-center"
        onClick={() => setLogoutModal(false)}
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
            Are you Sure to LogOut Account?
          </h1>
          <p className="mt-3 text-center">
            This process is not reverseable!
          </p>
          <div className="w-full mt-7 flex items-center justify-between">
          <button 
            onClick={() => setLogoutModal(false)}
            className={`px-4 py-2 cursor-pointer shadow-sm rounded-lg transition-bg duration-200
              ${appTheme 
                ? 'bg-gray-900 hover:bg-gray-800 ' 
                : 'bg-gray-200 hover:bg-gray-300 '}
            `}>
          No, Leave
          </button>
          <button 
            onClick={handleLogout}
          className="px-4 py-2 cursor-pointer flex items-center rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-200">
            Yes, Logout
            {loginOut && (
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

export default LogoutModal