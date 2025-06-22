"use client";
import { motion, AnimatePresence } from "framer-motion"
import {usePathname} from "next/navigation"
import Navbar from '@/components/Navbar'
import { ReactNode, useEffect, useState } from 'react'
import "../globals.css";
import { AppState } from "@/store";
import { supabase } from "../../../lib/supabase";

const HIDE_NAVBAR_PATHS = [
  '/dashboard/newpatient',
  '/dashboard/menu',
  /^\/dashboard\/[a-zA-Z0-9-_]+$/,
  /^\/dashboard\/[a-zA-Z0-9_-]+\/update$/, 
];

const variants = {
  hidden: {opacity: 0, x: -200, y: 0},
  enter: {opacity: 1, x: 0, y: 0},
  exit: {opacity: 0, x: 0, y: -100},
};

const DashboardLayout = ({children}: {children: ReactNode}) => {

  const pathname = usePathname();
  const shouldHideNavbar = HIDE_NAVBAR_PATHS.some(path => typeof path === 'string' 
    ? pathname === path 
    : path.test(pathname)
  );
  const {appTheme} = AppState()

  const [loading, setLoading] = useState<boolea                                                                      n>(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        window.location.href = '/login'; // redirect if not logged in
      } else {
        console.log('error user')
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return (
    <div className={`w-full h-screen flex items-center justify-center
      ${appTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}
    `}>
      <h1 className="text-lg">
        Checking session...
      </h1>
    </div>
  );


  return (
      <AnimatePresence mode="wait">
        <motion.main 
          key={pathname}
          variants={variants}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{type: 'linear'}}
        className={`relative w-full h-full text-white
            ${appTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}
        `}
        >
          {children}
        {!shouldHideNavbar && 
          <main className={`flex justify-center w-full`}
          >
            <Navbar />
          </main>
        }
        
      </motion.main>
    </AnimatePresence> 
  )
};

export default DashboardLayout