"use client";
import PatientList from '@/components/PatientList';
import {AppState} from "@/store";

const Dashboard = () => {

  const {appTheme} = AppState();  

  return (
    <div className={`w-full mx-auto h-full
      ${appTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}
    `}>
      <PatientList />
    </div>
  )
}

export default Dashboard