var firebase 	   = require("firebase-admin");
var serviceAccount = require("../config/serviceAccount.json");
const uuid 		   = require('uuid/v4');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://test-4520f.firebaseio.com"
});

var db = firebase.firestore();

const tags = [
	{ name: 'High Protein', isGrocerSection: false }
].map(ingredient => {
	return new Promise((resolve, reject) => {
		// insert tag
		const docRef = db.collection('tags').doc(uuid());

		docRef.set(ingredient).then(resp => {
			resolve(resp);
		});
	})
});

Promise.all(tags).then(responses => {
	console.warn('tags uploaded', responses);
})

