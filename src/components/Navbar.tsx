"use client";
import {usePathname} from "next/navigation";
import {motion} from "framer-motion"
import {AppState} from "@/store"
import {useRouter} from "next/navigation"
import { FaCirclePlus } from "react-icons/fa6";
import { ImSearch, ImMenu  } from "react-icons/im";
import {  GoHomeFill } from "react-icons/go";

type NavItems = {
  href: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  label: string;
}

const Navbar = () => {
  const pathname = usePathname();
  const route = useRouter()

  const {appTheme} = AppState();

  const navItems: NavItems[] = [
    { 
      href: '/dashboard', 
      icon: GoHomeFill,
      label: 'Home' 
    },
    { 
      href: '/dashboard/newpatient', 
      icon: FaCirclePlus,
      label: 'Add' 
    },
    { 
      href: '/dashboard/search', 
      icon: ImSearch ,
      label: 'Search' 
    },
    { 
      href: '/dashboard/menu', 
      icon: ImMenu,
      label: 'Menu' 
    },
  ];

  return (
    <div className="flex justify-center w-full mx-auto">
      <motion.div className={`fixed max-w-lg bottom-[1rem] w-[95%] flex items-center justify-center p-4 rounded-lg border border-gray-500 overflow-hidden 
          ${appTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}
        `}
        initial={{width: "3rem", height: "1.5rem"}}
        animate={{width: "95%", height: ""}}
        transition={{duration: 1.5}}
      >
        <nav className="w-full flex items-center justify-between">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
               <motion.div 
                  key={item.href}
                  onClick={() => route.push(item.href)} 
                  whileTap={{scale: [0.9, 1.1, 1], color: 'blue'}}
                  transition={{duration: 0.2}}
                className={`flex flex-col items-center  hover:scale-[1.1] 
                ${isActive ? 'text-blue-600' : 'text-gray-300'} `} 
             >
               <Icon
                className={`text-gray-300 hover:text-blue-600 hover:scale-[1.1] ${isActive ? 'text-blue-600 scale-[1.1]' : 'text-gray-400'}
                  ${appTheme ? 'text-gray-300' : 'text-gray-700'}
                `}
              />
            <span className={`text-xs mt-1 
                ${isActive ? 'font-semibold text-blue-600' : 'font-normal text-gray-300'} 
                ${appTheme ? 'text-gray-300' : 'text-gray-700'}
              `}
             >
              {item.label}
            </span>
          </motion.div>
          )
         })}
        </nav>
      </motion.div>
    </div>
    
  )
}

export default Navbar