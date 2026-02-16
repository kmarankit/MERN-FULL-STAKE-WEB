// import admin from 'firebase-admin';
// import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// export default admin;

import admin from 'firebase-admin';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountData = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccountData),
   storageBucket: "annpurna-dhaba-fresh-start.firebasestorage.app",
});

const bucket = admin.storage().bucket();
export{bucket};
export default admin;
