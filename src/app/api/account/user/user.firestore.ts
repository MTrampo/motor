import { firebaseAdmin } from "@/commons/lib/firebase/server";
import { UserFistore } from "@/commons/models/User";

export async function getUserByIdDoc(id: string) {
  const docRef = firebaseAdmin.db.collection(firebaseAdmin.getPath.user).doc(id);
  const docSnap = await docRef.get()

  if (!docSnap.exists) return null

  const data = docSnap.data() as UserFistore
  data.id = docSnap.id as string

  return data
}