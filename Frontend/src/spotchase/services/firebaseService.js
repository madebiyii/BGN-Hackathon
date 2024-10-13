import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.FIREBASE_TYPE,
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      clientId: process.env.FIREBASE_CLIENT_ID,
      authUri: process.env.FIREBASE_AUTH_URI,
      tokenUri: process.env.FIREBASE_TOKEN_URI,
      authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    }),
    databaseURL:
      "https://spotlove-6e05c-default-rtdb.europe-west1.firebasedatabase.app",
  });
}

const app = admin.app();
const db = admin.firestore();
const rdb = admin.database();
const storage = admin.storage();

/**
 * Applies a migration to each document in the specified collection.
 *
 * @param {string} collectionPath - The path to the Firestore collection.
 * @param {Function} migrationAction - A function that takes a Firestore document snapshot and applies the migration.
 */

async function applyMigration(collectionPath, migrationAction) {
  const collectionRef = db.collection(collectionPath);
  const snapshot = await collectionRef.get();
  const promises = [];
  snapshot.forEach((doc) => {
    promises.push(migrationAction(doc));
  });
  // Wait for all migrations to be applied
  await Promise.all(promises);
  console.log(
    `Migration applied to ${promises.length} documents in the '${collectionPath}' collection.`,
  );
}

async function addNewFieldMigration(doc) {
  const data = doc.data();
  const newData = { ...data, matchDistance: 20, isHidden: false };
  await doc.ref.update(newData);
}

/* OFF
applyMigration('Users', addNewFieldMigration)
  .then(() => console.log('Migration completed successfully.'))
  .catch(error => console.error('Error applying migration:', error));
*/

export { app, db, rdb, storage };
