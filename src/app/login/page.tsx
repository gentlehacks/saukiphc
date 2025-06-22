"use client"
import {motion} from "framer-motion"
import { AppState } from "@/store"
import Image from "next/image"
import clinicLogo from "@/images/logo.png"
import {useState} from "react"
import "../globals.css"
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"
import { supabase } from "../../../lib/supabase"


const LoginPage = () => {
  const {appTheme} = AppState();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null)
    setLoading(true);
  

    const { error } = await supabase.auth.signInWithPassword({ email, password });


  if (error) {
      setError(error.message); 
      setLoading(false)
    } else {
      window.location.href = "/dashboard"; // redirect if success
      setEmail('');
      setPassword('');
  }
};

  return (
    <div className={`relative mx-auto w-full h-screen flex flex-col justify-center p-6
      ${appTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}
    `}>

    <div className=" flex items-center justify-center w-full">
      <motion.div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden"
        initial={{scale: 100, rotate: 360}}
        animate={{scale: 1, rotate: 0}}
        transition={{duration: 2}}
      >
        <Image src={clinicLogo} alt="clinic logo" width={100} height={100} />
      </motion.div> 
    </div>
      

      <h1 className="text-2xl font-semibold mt-[4rem] w-full items-center justify-center text-center">Login</h1>

      <form onSubmit={handleLogin}>
        <div className="w-full sm:w-[35rem] flex flex-col justify-center mx-auto mt-6 space-y-4 mt-[3.5rem]">
          <div className="flex flex-col items-left w-full">
            <label className="text-xm font-medium mb-1">Email Address</label>
            <div className="relative flex items-center w-full">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" 
              />
            </div>
          </div>
          <div className="flex flex-col items-left w-full">
            <label className="text-xm font-medium mb-1">password</label>
            <div className="relative flex items-center w-full">
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="enter password"
                className="w-full px-4 py-3 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" 
              />
              <div className="absolute right-3">
                {showPassword ? (
                  <BsEyeFill 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="text-xl"
                  />
                ) : (
                  <BsEyeSlashFill 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="text-xl"
                  />
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="w-full mt-5">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-lg   transition-bg duration-200 mt-3
              ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}
            `}
          >
            {loading ? 'Logining...' : 'Login'}
          </button>
         
        </div>
      </form>
      
      <div className="absolute bottom-5 mx-auto left-0 right-0 flex items-center justify-center w-full">
        <p className="font-light">
        &copy; gentleman
        </p>
      </div>
    </div>
  )
}

export default LoginPage