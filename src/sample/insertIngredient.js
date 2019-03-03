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
		name: "Olive Oil",
		unit: true,
		nutrition: {
			calories: 884,
			fat: 100,
			cholesterol: 0,
			sodium: 0.002,
			carbs: {
				absolute: 0,
				dietaryFiber: 0,
				sugar: 0
			},
			protein: 0,
			allergies: [],
			category: "48c912f3-7732-41fe-a86c-7f563c37d037"
		}
	},
	{
		name: "Brown Sugar",
		unit: true,
		nutrition: {
			calories: 338,
			fat: 0,
			cholesterol: 0,
			sodium: 0.001,
			carbs: {
				absolute: 4.5,
				dietaryFiber: 0,
				sugar: 4.5
			},
			protein: 0,
			allergies: [],
			category: "48c912f3-7732-41fe-a86c-7f563c37d037"
		}
	},
	{
		name: "Soy Sauce",
		unit: true,
		nutrition: {
			calories: 53,
			fat: 0.6,
			cholesterol: 0,
			sodium: 5.49,
			carbs: {
				absolute: 4.9,
				dietaryFiber: 0.8,
				sugar: 0.4
			},
			protein: 8,
			allergies: [
				'a03854fa-bcb1-4388-a826-f40dce0d1376'
			],
			category: "70703f62-1303-454d-a5e6-5d77a3b77118"
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
