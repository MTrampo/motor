import { firebaseAdmin } from "@/commons/lib/firebase/server";
import { PushSubscriptionDocData } from "@/commons/models/Notification";

const getFinanceDocRef = (teamId: string, documentId: string) => {
  return firebaseAdmin.db.collection(firebaseAdmin.getPath.cost(teamId)).doc(documentId);
}

export async function addCostDoc(teamId: string, documentId: string, docData: PushSubscriptionDocData) {
  const docRef = getFinanceDocRef(teamId, documentId);
  await docRef.set(docData);
  return docRef.id;
}