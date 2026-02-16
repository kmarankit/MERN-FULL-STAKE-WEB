import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "annpurna-dhaba-fresh-start.firebasestorage.app",
});

const bucket = admin.storage().bucket();

export { bucket };
export default admin;
