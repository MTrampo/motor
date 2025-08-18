import { firebaseAdmin } from "@/commons/lib/firebase/server";
import { CostDocData, CostFistore, CostItemDocData } from "@/commons/models/Cost";
import { FieldValue } from "firebase-admin/firestore";

const getFinanceDocRef = (teamId: string, documentId: string) => {
  return firebaseAdmin.db.collection(firebaseAdmin.getPath.cost(teamId)).doc(documentId);
}

export async function getCostByIdDocs(teamId: string, documentId: string) {
  const docRef = getFinanceDocRef(teamId, documentId);
  const docSnap = await docRef.get();

  if (!docSnap.exists) return null;

  const data = docSnap.data() as CostFistore;
  data.id = docSnap.id;
  return data;
}

export async function addCostDoc(teamId: string, documentId: string, docData: CostDocData) {
  const docRef = getFinanceDocRef(teamId, documentId);
  await docRef.set(docData);
  return docRef.id;
}

export async function addCostDocAndUpdateTotal(teamId: string, documentId: string, newDocItemData: CostItemDocData[], total: number) {
  const docRef = getFinanceDocRef(teamId, documentId);
  await docRef.update({
    total,
    items: FieldValue.arrayUnion(...newDocItemData)
  })
  
  return docRef.id;
}