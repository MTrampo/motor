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
  cost: process.env.FIRESTORE_SUB_COLLECTION_COST as string,
  sale: process.env.FIRESTORE_SUB_COLLECTION_SALE as string,
  finance: process.env.FIRESTORE_SUB_COLLECTION_FINANCE as string,
  vehicle: process.env.FIRESTORE_SUB_COLLECTION_VEHICLES as string,
  customer: process.env.FIRESTORE_SUB_COLLECTION_CUSTOMER as string,
  statusHistory: process.env.FIRESTORE_SUB_COLLECTION_STATUS_HISTORY as string,
  vehicleSummary: process.env.FIRESTORE_SUB_COLLECTION_VEHICLE_SUMMARY as string,
}

export const getPath: FirestorePaths = {
  // Coleções principais
  user: `${collection.user}`,
  team: `${collection.team}`,
  teamMembers: `${collection.teamMembers}`,

  // Sub-coleções
  cost: (teamId: string): string => `${collection.team}/${teamId}/${subCollection.cost}`,
  sale: (teamId: string): string => `${collection.team}/${teamId}/${subCollection.sale}`,
  finance: (teamId: string): string => `${collection.team}/${teamId}/${subCollection.finance}`,
  vehicle: (teamId: string): string => `${collection.team}/${teamId}/${subCollection.vehicle}`,
  customer: (teamId: string): string => `${collection.team}/${teamId}/${subCollection.customer}`,
  statusHistory: (teamId: string): string => `${collection.team}/${teamId}/${subCollection.statusHistory}`,
  vehicleSummary: (teamId: string): string => `${collection.team}/${teamId}/${subCollection.vehicleSummary}`,
}