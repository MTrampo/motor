import { firebaseAdmin } from "@/commons/lib/firebase/server";
import { TeamMemberFirestore } from "@/commons/models/Team";

export async function getUserTeamsDoc(userId: string) {
  const docsRef = firebaseAdmin.db.collection(firebaseAdmin.getPath.teamMembers);
  const querySnap = docsRef.where('userId', '==', userId);      
  const docSnap = await querySnap.get()
  
  if (docSnap.empty) return null;
  const documents: Array<TeamMemberFirestore> = [];

  for (const doc of docSnap.docs) {
    const data = doc.data() as TeamMemberFirestore;
    data.id = doc.id as string;

    documents.push(data);
  }

  return documents;
}