type FirestorePaths = {
  [K in keyof typeof collection]: string;
} & {
  [K in keyof typeof subCollection]: (userId: string) => string;
}

const collection = {
  user: process.env.FIRESTORE_COLLECTION_USER as string,
  team: process.env.FIRESTORE_COLLECTION_TEAM as string,
  teamMembers: process.env.FIRESTORE_COLLECTION_TEAM_MEMBERS as string,
}

const subCollection = {
  vehicle: process.env.FIRESTORE_SUB_COLLECTION_VEHICLES as string,
  vehicleSummary: process.env.FIRESTORE_SUB_COLLECTION_VEHICLE_SUMMARY as string,
  cost: process.env.FIRESTORE_SUB_COLLECTION_COST as string,
  finance: process.env.FIRESTORE_SUB_COLLECTION_FINANCE as string,
  customer: process.env.FIRESTORE_SUB_COLLECTION_CUSTOMER as string,
}

export const getPath: FirestorePaths = {
  // Coleções principais
  user: `${collection.user}`,
  team: `${collection.team}`,
  teamMembers: `${collection.teamMembers}`,

  // Sub-coleções
  vehicle: (teamId: string): string => `${collection.team}/${teamId}/${subCollection.vehicle}`,
  vehicleSummary: (teamId: string): string => `${collection.team}/${teamId}/${subCollection.vehicleSummary}`,
  cost: (teamId: string): string => `${collection.team}/${teamId}/${subCollection.cost}`,
  finance: (teamId: string): string => `${collection.team}/${teamId}/${subCollection.finance}`,
  customer: (teamId: string): string => `${collection.team}/${teamId}/${subCollection.customer}`,
}