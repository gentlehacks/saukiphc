"use client"
import PatientListLoader from '@/components/PatientListLoader';
import PatientListHeader from '@/components/PatientListHeader';
import "../globals.css"

const PatientLoader = () => {
  return (
    <div className='flex flex-col w-full h-screen bg-gray-900'>
      <PatientListHeader />
      <PatientListLoader />
    </div>
  )
}

export default PatientLoader