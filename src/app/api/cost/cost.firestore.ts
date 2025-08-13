import { firebaseAdmin } from "@/commons/lib/firebase/server";
import { CostFistore } from "@/commons/models/Cost";

export async function getCostByIdDocs(teamId: string, documentId: string) {
  const docRef = firebaseAdmin.db.collection(firebaseAdmin.getPath.cost(teamId)).doc(documentId);
  const docSnap = await docRef.get();

  if (!docSnap.exists) return null;

  const data = docSnap.data() as CostFistore;
  data.id = docSnap.id;
  return data;
}