"use client";
import {motion} from "framer-motion";
import { AppState } from "@/store";
import Link from 'next/link';
import "./globals.css"
import Image from 'next/image'
import { IoArrowForward } from "react-icons/io5";

const Home = () => {

  const {appTheme} = AppState()

  return (
    <div className={`mx-auto w-full h-screen flex flex-col justify-center 
      ${appTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}
    `}>
      <div className="w-full flex flex-col justify-center p-8 overflow-hidden">
        <motion.div className="w-full flex justify-center"
          initial={{x: "40%", opacity: 0}}
          animate={{x: 0, opacity: 1}}
          transition={{duration: 1}}
        >
          <Image src="/doctors.svg" alt="3d-image" width={250} height={250} />
        </motion.div>
        <motion.h1 className={`text-3xl sm:text-[2.5rem] text-center font-bold text-gray-100 px-[1rem] my-[2rem] mt-[4rem]
            ${appTheme ? 'text-blue-600' : 'text-blue-600'}
          `}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 2}}
        >
          Sauki Patient Record System
        </motion.h1>
        <Link href="/login" className="flex justify-center mt-[2rem]">
          <motion.button className='px-6 py-3 flex items-center rounded-lg text-white text-lg bg-blue-600 hover:bg-blue-700 transition-bg duration-200 cursor-pointer'
            initial={{scale: 0.5}}
            animate={{scale: 1}}
            whileTap={{scale: [0.9, 1.1, 1]}}
            transition={{duration: 0.3}}
          >
            Continue
            <IoArrowForward className="text-xl ml-3" />
          </motion.button>
        </Link>
      </div>
    </div>
  )
}

export default Home