
import { notFound } from "next/navigation";
import { getPatientById } from "@/actions/patients/get-patient";
import PatientClient from "@/components/PatientClient";

// ✅ Use correct type as defined by Next.js App Router
export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const patient = await getPatientById(params.id);

  if (!patient) {
    return notFound();
  }

  return <PatientClient patient={patient} />;
}

// ✅ Optional metadata function (same type structure)
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  return {
    title: `Patient - ${params.id}`,
  };
}
