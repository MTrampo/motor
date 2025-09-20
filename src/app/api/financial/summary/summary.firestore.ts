import { firebaseAdmin } from "@/commons/lib/firebase/server";
import { FinanceDocData, FinanceFirestore } from "@/commons/models/Finance";
import { Timestamp } from "firebase-admin/firestore";

const getFinanceDocRef = (teamId: string, documentId: string) => {
  return firebaseAdmin.db.collection(firebaseAdmin.getPath.finance(teamId)).doc(documentId);
}

export async function getFinanceDocByPeriod(teamId: string, period: string): Promise<FinanceFirestore | null> {
  const docRef = getFinanceDocRef(teamId, period);
  const docSnap = await docRef.get();

  if (!docSnap.exists) return null;

  const data = docSnap.data() as FinanceFirestore;
  data.id = docSnap.id;
  return data;
}

export async function getFinanceDocByFlexibleOrFixedPeriods(teamId: string, startDate: Date, endDate: Date) {
  const docsRef = firebaseAdmin.db.collection(firebaseAdmin.getPath.finance(teamId));
  const querySnap = docsRef
    .where('createdAt', '>=', Timestamp.fromDate(startDate))
    .where('createdAt', '<=', Timestamp.fromDate(endDate))
    .orderBy('createdAt', 'desc');

  const docSnapshot = await querySnap.get();

  if (docSnapshot.empty) return null;
  const documents: Array<FinanceFirestore> = [];

  for (const doc of docSnapshot.docs) {
    const data = doc.data() as FinanceFirestore;
    data.id = doc.id as string;

    documents.push(data);
  }

  return documents;
}

export async function createFinanceDoc(teamId: string, period: string, initialData: FinanceDocData): Promise<string> {
  const docRef = getFinanceDocRef(teamId, period);
  await docRef.set(initialData);
  
  return docRef.id;
}

export async function updateFinanceDoc(teamId: string, period: string, updateData: Partial<FinanceDocData>): Promise<string> {
  const docRef = getFinanceDocRef(teamId, period);
  await docRef.update({ ...updateData, updatedAt: Timestamp.now() });

  return docRef.id;
}