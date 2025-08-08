type FirestorePaths = {
  [K in keyof typeof subCollection]: (userId: string) => string;
} & {
  custom?: (userId: string, path: string) => string; // Método extra
}

const collection = {
  user: process.env.FIRESTORE_COLLECTION_USER as string
}

const subCollection = {
  user: process.env.FIRESTORE_SUB_COLLECTION_USER as string,
  budget: process.env.FIRESTORE_SUB_COLLECTION_BUDGET as string,
  service: process.env.FIRESTORE_SUB_COLLECTION_SERVICE as string,
  finance: process.env.FIRESTORE_SUB_COLLECTION_FINANCE as string,
  customer: process.env.FIRESTORE_SUB_COLLECTION_CUSTOMER as string,
}

export const getPath: FirestorePaths = {
  // Métodos diretos para cada tipo
  user: (userId: string): string => `${collection.user}/${userId}`,
  budget: (userId: string): string => `${collection.user}/${userId}/${subCollection.budget}`,
  service: (userId: string): string => `${collection.user}/${userId}/${subCollection.service}`,
  finance: (userId: string): string => `${collection.user}/${userId}/${subCollection.finance}`,
  customer: (userId: string): string => `${collection.user}/${userId}/${subCollection.customer}`,

  // (Opcional) Método genérico se precisar
  custom: (userId: string, path: string): string => `exemplo/${userId}/${path}`,
}