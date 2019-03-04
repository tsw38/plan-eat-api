var firebase 	   = require("firebase-admin");
var serviceAccount = require("../config/serviceAccount.json");
const uuid 		   = require('uuid/v4');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://test-4520f.firebaseio.com"
});

var db = firebase.firestore();

const mealType = [
	{
		name: 'Breakfast'
	},
	{
		name: 'Brunch'
	},
	{
		name: 'Lunch'
	},
	{
		name: 'Supper'
	},
	{
		name: 'Dinner'
	},
	{
		name: 'Snack'
	},
	{
		name: 'Other'
	}
].map(mealType => {
	return new Promise((resolve, reject) => {
		// insert mealType
		const docRef = db.collection('mealTypes').doc(uuid());

		docRef.set(mealType).then(resp => {
			resolve(resp);
		});
	})
});
