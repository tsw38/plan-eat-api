var firebase 	   = require("firebase-admin");
var serviceAccount = require("../config/serviceAccount.json");
const uuid 		   = require('uuid/v4');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://test-4520f.firebaseio.com"
});

var db = firebase.firestore();

const recipes = [
	{
		mealType: "3cce8c44-97cc-444f-820d-cbce66de51e0",
		name: "Gold Standard Whey - Banana Cream",
		description: "",
        uploadedBy: "e4314245-1eb7-49cf-8412-a39c0486f19e",
        slug: 'gold-standard-whey-banana-cream',
		source: {
			name: "The Recipe Critic",
			url: "https://awdawd.com"
		},
		ratings: [],
		ingredients: [
			{
				id: "9abbd533-3b3d-4be9-aa72-d91df8397a4d",
				quantity: 1
			}
		],
		directions: [
			'Drink it'
		],
		prepTime: 1,
		cookTime: 0,
		servingSize: 1,
		notes: "",
		images: {
			thumbnail: "",
			full: ""
		},
		tags: []
	}
].map(ingredient => {
	return new Promise((resolve, reject) => {
		// insert ingredient
		const docRef = db.collection('recipes').doc(uuid());

		docRef.set(ingredient).then(resp => {
			resolve(resp);
		});
	})
});

Promise.all(recipes).then(responses => {
	console.warn('recipes uploaded', responses);
})

