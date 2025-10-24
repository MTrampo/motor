import { firebaseAdmin } from "@/commons/lib/firebase/server";
import { VehicleSaleDocData, VehicleSaleFirestore } from "@/commons/models/Sale";

const getSaleDocRef = (teamId: string, documentId: string) => {
  return firebaseAdmin.db.collection(firebaseAdmin.getPath.sale(teamId)).doc(documentId);
}

export async function getSaleByIdDocs(teamId: string, documentId: string) {
  const docRef = getSaleDocRef(teamId, documentId);
  const docSnap = await docRef.get();

  if (!docSnap.exists) return null;
  
  const data = docSnap.data() as VehicleSaleFirestore;
  data.id = docSnap.id;
  return data;
}

export async function addVehicleSale(teamId: string, documentId: string, docData: VehicleSaleDocData) {
  const docRef = getSaleDocRef(teamId, documentId);
  await docRef.set(docData);
  return docRef.id;
}