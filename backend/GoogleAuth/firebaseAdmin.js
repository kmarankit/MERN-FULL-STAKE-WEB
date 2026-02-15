// import admin from 'firebase-admin';
// import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// export default admin;

import admin from 'firebase-admin';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
const serviceAccountData = JSON.parse(await readFile(serviceAccountPath, 'utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountData),
   storageBucket: "annpurna-dhaba-fresh-start.firebasestorage.app",
});

const bucket = admin.storage().bucket();
export{bucket};
export default admin;
