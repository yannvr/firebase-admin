const admin = require("firebase-admin")
const serviceAccount = require("./green-life-254320-ea64506ac40e.json")
fs = require("fs")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const run = async () => {
  // const snapshot = await db.collection('users').get();
  // console.log('length', snapshot.docs.length);
  const collectionRef = await db.collection("users")
  const queryRes = await collectionRef.where("ml", "==", true).get()
  console.log("queryRes", queryRes)

  let results = ""

  queryRes.forEach((doc, i) => {
    // console.log(doc.id, '=>', doc.id);
    // console.log(i, '=>', i);
    results += doc.id + "\n"
  })
  const filename = new Date().toLocaleString().split(",")[1] + '.csv'
  fs.writeFileSync(filename, results)
}

run()
