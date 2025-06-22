"use client";
import { AppState } from "@/store";
import {motion} from "framer-motion"
import Image from 'next/image'
import {useRouter} from "next/navigation"
import {useState} from "react"
import { FaLock, FaMoon, FaSun } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ChangePasswordModal from "@/components/ChangePasswordModal";
import { FaSignOutAlt } from "react-icons/fa";
import LogoutModal from "@/components/LogoutModal";

const MenuPage = () => {
  
  const {appTheme, setAppTheme} = AppState();
  const route = useRouter();

  const [changePsdModal, setChangePsdModal] = useState<boolean>(false);
  const [logoutModal, setLogoutModal] = useState<boolean>(false);

  return (
    <div className={`relative w-full justify-left h-screen px-4 transition-all duration-300
      ${appTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}
    `}>
      <motion.div className="pt-4 overflow-hidden"
        initial={{x: "15px", scale: 0.8}}
        animate={{x: 0, scale: 1}}
        transition={{duration: 1}}
      >
        <div onClick={() => route.back()} className="flex items-center">
          <IoIosArrowBack className='text-xl text-gray-300 hover:text-blue-600 duration-200' />
          <h2 className="text-md ml-2">Back</h2>
        </div>
      </motion.div>

    <motion.div className="flex items-center mt-[2.5rem]"
      initial={{x: '-15px', opacity: 0}}
      animate={{x: 0, opacity: 1}}
      transition={{duration: 1}}
    >
      <div className="flex items-center justify-center w-15 h-15 rounded-full overflow-hidden border border-blue-500">
        <Image src="/logo.PNG" alt="clinic logo" width={120} height={120} />
      </div>
      <div className="flex flex-col ml-3">
        <h1 className="text-lg font-light">Sauki PHC Clinic</h1>
        <p className="text-sm text-gray-400">
          Founder: Muhammed Salihu Bk
        </p>
      </div>
    </motion.div>

    <div className="w-full h-screen flex flex-col justify-between mt-[2rem]">
      <div className="flex flex-col space-y-3">
        <div className={`flex items-center justify-between p-2 transition-bg duration-200 rounded-lg shadow-sm
          ${appTheme 
          ? 'bg-gray-900 hover:bg-gray-800 text-white' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}
        `}>
          <div className="flex items-center">
            <FaMoon size={22} />
            <h1 className="text-lg font-semibold ml-3">Theme</h1>
          </div>
          <div className="flex w-[2.8rem] h-7 bg-gray-200 rounded-full">
            <motion.div 
              onClick={() => setAppTheme()}
            className={`w-full h-full relative rounded-full cursor-pointer
               bg-white
            `}>
              <motion.div
                className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center
                `}
                initial={{
                  x: appTheme ? 0 : 18
                }}
                animate={{
                  x: appTheme ? 18 : 0
                }}
                transition={{duration: 0.3}}
              >
                {appTheme ? (
                  <FaMoon size={18} />
                ) : (
                  <FaSun size={18} />
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
        <div 
         onClick={() => setChangePsdModal(!changePsdModal)}
        className={`flex items-center justify-between  p-2 transition-bg duration-200 rounded-lg shadow-sm cursor-pointer
          ${appTheme ? 'bg-gray-900  text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}
        `}>
          <div className="flex items-center">
            <FaLock size={22} />
            <h1 className="text-lg font-semibold ml-3">Change Password?</h1>
          </div>
          <IoIosArrowForward size={22} />
        </div>
         <div 
         onClick={() => setLogoutModal(true)}
        className={`flex items-center justify-between  p-2 transition-bg duration-200 rounded-lg shadow-sm cursor-pointer
          ${appTheme ? 'bg-gray-900  text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}
        `}>
          <div className="flex items-center">
            <FaSignOutAlt size={22} />
            <h1 className="text-lg font-semibold ml-3">Logout</h1>
          </div>
          <IoIosArrowForward size={22} />
        </div>
      </div>
    </div>

    {changePsdModal && (
      <ChangePasswordModal
        changePsdModal={changePsdModal}
        setChangePsdModal={setChangePsdModal}
      />
    )}

    {logoutModal && (
      <LogoutModal 
        setLogoutModal={setLogoutModal} 
      />
    )}

  </div>
  )
}

export default MenuPage