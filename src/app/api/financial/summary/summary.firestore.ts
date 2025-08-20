import { firebaseAdmin } from "@/commons/lib/firebase/server";
import { FinanceDocData, FinanceFirestore } from "@/commons/models/Finance";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

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