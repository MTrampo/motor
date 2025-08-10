import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getPath } from "./paths";

const credentialConfig = {
  //credential: admin.credential.cert({
    //type: process.env.FIREBASE_TYPE as string,
    projectId: process.env.FIREBASE_PROJECT_ID as string,
    //privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    //clientId: process.env.FIREBASE_CLIENT_ID as string,
    //authUri: process.env.FIREBASE_AUTH_URI as string,
    //tokenUri: process.env.FIREBASE_TOKEN_URI,
    //authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL as string,
    //clientX509CertUrl: process.env.FIREBASE_CLIENT_CERT_URL as string,
    //universeDomain: process.env.FIREBASE_UNIVERSE_DOMAIN as string,
  //})
}

const app = getApps().length === 0
  ? initializeApp({
    credential: cert(credentialConfig),
    projectId: credentialConfig.projectId
  })
  : getApp()

const db = getFirestore(app)
const auth = getAuth(app)

export const firebaseAdmin = {
  app,
  db,
  auth,
  getPath
}
