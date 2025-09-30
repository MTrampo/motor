import { firebaseAdmin } from "@/commons/lib/firebase/server";
import { VehicleDocData, VehicleFistore, VehicleSummaryDocData, VehicleSummaryFirestore } from "@/commons/models/Vehicle";
import { Timestamp } from "firebase-admin/firestore";

const getVehicleDocRef = (teamId: string, documentId: string) => {
  return firebaseAdmin.db.collection(firebaseAdmin.getPath.vehicle(teamId)).doc(documentId);
}

const getVehicleSummaryDocRef = (teamId: string, documentId: string) => {
  return firebaseAdmin.db.collection(firebaseAdmin.getPath.vehicleSummary(teamId)).doc(documentId);
}

export async function getVehicleByIdDocs(teamId: string, documentId: string) {
  const docRef = firebaseAdmin.db.collection(firebaseAdmin.getPath.vehicle(teamId)).doc(documentId);
  const docSnap = await docRef.get();

  if (!docSnap.exists) return null;

  const data = docSnap.data() as VehicleFistore;
  data.id = docSnap.id;
  return data;
}

export async function getAllVehiclesSummaryDocs(teamId: string) {
  const querySnapshot = await firebaseAdmin.db.collection(firebaseAdmin.getPath.vehicleSummary(teamId)).get()
  
  if (querySnapshot.empty) return null;
  const documents: Array<VehicleSummaryFirestore> = [];

  for (const doc of querySnapshot.docs) {
    const data = doc.data() as VehicleSummaryFirestore;
    data.id = doc.id as string;

    documents.push(data);
  }

  return documents;
}

export async function getAllVehiclesDocs(teamId: string) {
  const querySnapshot = await firebaseAdmin.db.collection(firebaseAdmin.getPath.vehicle(teamId)).get()
  
  if (querySnapshot.empty) return null;
  const documents: Array<VehicleFistore> = [];

  for (const doc of querySnapshot.docs) {
    const data = doc.data() as VehicleFistore;
    data.id = doc.id as string;

    documents.push(data);
  }

  return documents;
}

export async function addVehicleDoc(teamId: string, documentId: string, vehicleDocData: VehicleDocData, vehicleSummaryDocData: VehicleSummaryDocData) {
  const docRef = getVehicleDocRef(teamId, documentId);
  await docRef.set(vehicleDocData);
  
  const summaryDocRef = getVehicleSummaryDocRef(teamId, documentId);
  await summaryDocRef.set(vehicleSummaryDocData);

  return true;
}

export async function updateVehicleCostDoc(teamId: string, documentId: string, newValue: number) {
  const docRef = getVehicleSummaryDocRef(teamId, documentId);
  await docRef.update({ 
    totalCost: newValue, 
    updatedAt: Timestamp.now() 
  });
  
  return docRef.id;
}

export async function updateCurrentStatusDoc(teamId: string, documentId: string, status: number) {
  const docVehicleRef = getVehicleDocRef(teamId, documentId);
  await docVehicleRef.update({ 
    status, 
    updatedAt: Timestamp.now() 
  });

  const docVehicleSummaryRef = getVehicleSummaryDocRef(teamId, documentId);
  await docVehicleSummaryRef.update({ 
    status, 
    updatedAt: Timestamp.now() 
  });
  
  return docVehicleRef.id;
}