type FirestorePaths = {
  [K in keyof typeof subCollection]: (userId: string) => string;
} & {
  custom?: (userId: string, path: string) => string; // Método extra
}

const collection = {
  user: process.env.FIRESTORE_COLLECTION_USER as string,
  team: process.env.FIRESTORE_COLLECTION_TEAM as string,
}

const subCollection = {
  user: process.env.FIRESTORE_SUB_COLLECTION_USER as string,
  vehicle: process.env.FIRESTORE_SUB_COLLECTION_VEHICLES as string,
  // budget: process.env.FIRESTORE_SUB_COLLECTION_BUDGET as string,
  cost: process.env.FIRESTORE_SUB_COLLECTION_COST as string,
  finance: process.env.FIRESTORE_SUB_COLLECTION_FINANCE as string,
  customer: process.env.FIRESTORE_SUB_COLLECTION_CUSTOMER as string,
}

export const getPath: FirestorePaths = {
  // Métodos diretos para cada tipo
  user: (teamId: string): string => `${collection.team}/${teamId}`,
  vehicle: (teamId: string): string => `${collection.team}/${teamId}/${subCollection.vehicle}`,
  // budget: (teamId: string): string => `${collection.user}/${teamId}/${subCollection.budget}`,
  cost: (teamId: string): string => `${collection.team}/${teamId}/${subCollection.cost}`,
  finance: (teamId: string): string => `${collection.team}/${teamId}/${subCollection.finance}`,
  customer: (teamId: string): string => `${collection.team}/${teamId}/${subCollection.customer}`,

  // (Opcional) Método genérico se precisar
  custom: (userId: string, path: string): string => `exemplo/${userId}/${path}`,
}