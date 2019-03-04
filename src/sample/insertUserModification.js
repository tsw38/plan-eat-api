var firebase 	   = require("firebase-admin");
var serviceAccount = require("../config/serviceAccount.json");
const uuid 		   = require('uuid/v4');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://test-4520f.firebaseio.com"
});

var db = firebase.firestore();

const recipeModifications = [
	{
		user: 'eb0963a5-1df8-4ba2-be40-406259d2de59',
		mealType: "deaa928e-6a40-49e0-9320-14b5ca2cd93d",
		description: "Poopy",
		cookTime: 5,
		prepTime: 35,
		servingSize: 12,
		ingredients: [
			{
				id: "24834e34-59fe-497b-9f89-68095ab39407",
				quantity: 7
			},
		],
		notes: "No sir"
	}
].map(modification => {
	return new Promise((resolve, reject) => {
		// insert modification
		const docRef = db.collection('recipeModifications').doc(uuid());

		docRef.set(modification).then(resp => {
			resolve(resp);
		});
	})
});

Promise.all(recipeModifications).then(responses => {
	console.warn('recipeModifications uploaded', responses);
})

