var firebase 	   = require("firebase-admin");
var serviceAccount = require("../config/serviceAccount.json");
const uuid 		   = require('uuid/v4');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://test-4520f.firebaseio.com"
});

var db = firebase.firestore();

const mealPrep = [
	{
		name: '',
		creationDate: new Date(),
		userId: 'eb0963a5-1df8-4ba2-be40-406259d2de59',
		days: {
			['_1']: [
				{
					recipe: "1a95d26b-e1e8-4905-b302-dc44d43f3f89",
					mealType: "2c34a6fd-2586-4bb9-802e-61dcfbe86201"
				}
			]
		},
		preferences: [
			{
				mealType: "99983489-9658-4e68-a378-fe03660fff82",
				customMealName: 'Break Fast Bitch!!!!!',
				frequency: 4,
				totalCaloriePercentage: 30
			}
		]
	},
].map(mealPrep => {
	return new Promise((resolve, reject) => {
		// insert mealPrep
		const docRef = db.collection('mealPreps').doc(uuid());

		docRef.set(mealPrep).then(resp => {
			resolve(resp);
		});
	})
});
