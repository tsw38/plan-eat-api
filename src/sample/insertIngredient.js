var firebase 	   = require("firebase-admin");
var serviceAccount = require("../config/serviceAccount.json");
const uuid 		   = require('uuid/v4');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://test-4520f.firebaseio.com"
});

var db = firebase.firestore();

const ingredients = [
	{
		name: "Gold Standard Whey - Banana Cream",
		unit: true,
		nutrition: {
			calories: 387.0967742,
			fat: 3.225806452,
			cholesterol: 0,
			sodium: 0.4193548387,
			carbs: {
				absolute: 12.90322581,
				dietaryFiber: 0,
				sugar: 6.451612903
			},
			protein: 77.41935484,
			allergies: [],
			category: "07304b8c-2952-422f-afc7-8bf5752f527b"
		}
	},
].map(ingredient => {
	return new Promise((resolve, reject) => {
		// insert ingredient
		const docRef = db.collection('ingredients').doc(uuid());

		docRef.set(ingredient).then(resp => {
			resolve(resp);
		});
	})
});
