import { firebaseAdmin } from "@/commons/lib/firebase/server";
import { VehicleFistore } from "@/commons/models/Vehicle";

export async function getVehicleByIdDocs(teamId: string, documentId: string) {
  const docRef = firebaseAdmin.db.collection(firebaseAdmin.getPath.vehicle(teamId)).doc(documentId);
  const docSnap = await docRef.get();

  if (!docSnap.exists) return null;

  const data = docSnap.data() as VehicleFistore;
  data.id = docSnap.id;
  return data;
}

export async function getAllVehiclesDocs(teamId: string) {
  const querySnapshot = await firebaseAdmin.db.collection(firebaseAdmin.getPath.vehicle(teamId)).get()
  
  const documents: Array<VehicleFistore> = [];

  if (querySnapshot.empty) return null;

  for (const doc of querySnapshot.docs) {
    const data = doc.data() as VehicleFistore;
    data.id = doc.id as string;

    documents.push(data);
  }

  return documents;
}