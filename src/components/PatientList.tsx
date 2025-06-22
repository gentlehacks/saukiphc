"use client"
import PatientListHeader from './PatientListHeader'
import PatientCard from './PatientCard'
import { AppState } from '@/store'
import { useEffect, useState } from 'react';
import { getPatients } from '@/actions/patients/get-patients';
import { Patient } from '@/actions/patients/types';

const PatientList = () => {

  const {appTheme} = AppState()
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    }

    fetchPatients();
  }, [])

  
  if (loading) return (
    <div className={`w-full h-screen flex flex-col
      ${appTheme 
       ? "bg-gray-900 text-white"
       : "bg-gray-100 text-gray-900"}
    `}>
      <PatientListHeader />
      <div className="flex items-center justify-center ">
        <h2>Loading patients...</h2>
      </div>
    </div>
  )

  return (
    <div className={`w-full  h-screen overflow-hidden
       ${appTheme 
       ? "bg-gray-900 text-white"
       : "bg-gray-100 text-gray-900"}
    `}>
      <PatientListHeader />

      {patients.length === 0 && (
        <div className='flex items-center justify-center'>
          No patient found.
        </div>
      )}

      <section>
        <ul className={`w-full space-y-3 px-3 `}>
          {patients?.map(patient => (
            <PatientCard
              key={patient.id}
              patientId={patient.id}
              name={patient.name}
              cost={patient.cost}
            />
          ))}
        </ul>
      </section>
    </div>
  )
}

export default PatientList