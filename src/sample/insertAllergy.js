var firebase 	   = require("firebase-admin");
var serviceAccount = require("../config/serviceAccount.json");
const uuid 		   = require('uuid/v4');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://test-4520f.firebaseio.com"
});

var db = firebase.firestore();





const allergies = [
	{
		name: "Fish",
		desc: ""
	},
	{
		name: "Egg",
		desc: ""
	},
	{
		name: "Soy",
		desc: ""
	},
	{
		name: "Nut",
		desc: ""
	},
	{
		name: "Shellfish",
		desc: ""
	},
	{
		name: "Milk",
		desc: ""
	},
	{
		name: "Wheat",
		desc: ""
	}
].map(allergy => {
	return new Promise((resolve, reject) => {
		// insert allergy
		const docRef = db.collection('allergies').doc(uuid());

		docRef.set(allergy).then(resp => {
			resolve(resp);
		});
	})
})

Promise.all(allergies).then(responses => {
	console.warn('responses', responses);
})

