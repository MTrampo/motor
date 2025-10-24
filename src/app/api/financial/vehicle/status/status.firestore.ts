import { firebaseAdmin } from "@/commons/lib/firebase/server";
import { VehicleStatusHistoryDocData, VehicleStatusHistoryFirestore } from "@/commons/models/Vehicle";
import { Timestamp } from "firebase-admin/firestore";

const getStatusHistoryDocRef = (teamId: string) => {
  return firebaseAdmin.db.collection(firebaseAdmin.getPath.statusHistory(teamId));
}

export async function getLatestXStatusDocs(teamId: string, plate: string, x: number) {
  const docsRef = getStatusHistoryDocRef(teamId);
  const querySnap = docsRef
    .where('plate', '==', plate)
    .where('createdAt', '<=', Timestamp.fromDate(new Date()))
    .orderBy('createdAt', 'asc')
    .limit(x);

  const docSnapshot = await querySnap.get();
  if (docSnapshot.empty) return null;

  const documents: Array<VehicleStatusHistoryFirestore> = [];
  for (const doc of docSnapshot.docs) {
    const data = doc.data() as VehicleStatusHistoryFirestore;
    data.id = doc.id as string;

    documents.push(data);
  }

  return documents;
}

export async function addStatusHistoryDoc(teamId: string, docData: VehicleStatusHistoryDocData) {
  const docRef = getStatusHistoryDocRef(teamId);
  await docRef.add(docData);
  return docRef.id;
}

export async function updateCurrentStatusDoc(teamId: string, documentId: string, endedAt: Date) {
  const docRef = getStatusHistoryDocRef(teamId).doc(documentId);
  await docRef.update({ 
    endedAt: Timestamp.fromDate(endedAt), 
    updatedAt: Timestamp.now() 
  });
  
  return docRef.id;
}