import { firebaseAdmin } from "@/commons/lib/firebase/server";
import { VehicleFistore } from "@/commons/models/Vehicle";

export async function getAllVehiclesDocs(teamId: string) {
  const querySnapshot = await firebaseAdmin.db.collection(firebaseAdmin.getPath.vehicles(teamId)).get()
  
  const documents: Array<VehicleFistore> = [];

  if (querySnapshot.empty) {
    console.log('Orçamentos não encontrados!');
    return documents;
  }

  for (const doc of querySnapshot.docs) {
    const data = doc.data() as VehicleFistore;
    data.id = doc.id as string;

    documents.push(data);
  }

  return documents;
}