var firebase 	   = require("firebase-admin");
var serviceAccount = require("../config/serviceAccount.json");
const uuid 		   = require('uuid/v4');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://test-4520f.firebaseio.com"
});

var db = firebase.firestore();

// insert user
var docRef = db.collection('users').doc('e4314245-1eb7-49cf-8412-a39c0486f19e');

docRef.set({
	lastLogin: new Date(),
	settings: {
		startOfWeek: 1,
		units: true
	},
	recipeModifications: [
		'1ee33b60-762e-4867-b4a2-fa4dbc04a2ba',
		'386993a4-eb16-45b4-ad6e-8a94bed88155'
	],
	allergies: [
		'6ececab5-15d3-415e-b35b-628531d560b7'
	],
	password: '12345',
	bannedRecipes: [
	],
	nutrition: {
		calories: 10,
		fat: 20,
		protein: 10,
		carbs: 0
	},
	email: 'jfagnilli@gmail.com',
	mealPrep: {},
	name: {
		first: 'Joseph',
		middle: 'Luigi',
		last: 'Fagnilli'
	},
	dietaryPreferences: [
	],
	favorites: {
		mealPreps: [],
		recipes: []
	},
	joinedAccounts: [
		'eb0963a5-1df8-4ba2-be40-406259d2de59'
	]
}).then(resp => {
	console.warn('user inserted', resp);
});