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
		name: "Garlic Brown Sugar Glazed Salmon",
		description: "Garlic Brown Sugar Glazed Salmon has the most amazing garlic brown sugar soy glaze.  The flavor is out of this world and it will become a new family favorite!",
		uploadedBy: "e4314245-1eb7-49cf-8412-a39c0486f19e",
		source: {
			name: "The Recipe Critic",
			url: "https://therecipecritic.com"
		},
		ratings: [{
			id: "e4314245-1eb7-49cf-8412-a39c0486f19e",
			rating: 3
		}],
		ingredients: [
			{
				id: "24834e34-59fe-497b-9f89-68095ab39407",
				quantity: 9.07
			},
			{
				id: "fcb4593e-c448-4976-9d2a-7564fc292cbc",
				quantity: 0.5
			},
			{
				id: "3c41883d-647f-490e-8ab2-0d5ae2be57eb",
				quantity: 0.05
			},
			{
				id: "60d76b53-3ebe-4ea2-babb-d21a2bb87e7e",
				quantity: 0.92
			}
		],
		directions: [
			'Preheat oven to 350 degrees. Line a baking sheet with aluminum foil. Lay the salmon on top and sprinkle with salt and pepper. Fold up the sides of the aluminum foil around the salmon.',
			'In a small bowl whisk together the olive oil, brown sugar, soy sauce, garlic, lemon juice, salt, and pepper. Pour the glaze over the salmon. Top the salmon with aluminum foil and seal.',
			'Bake for 20-25 minutes or until salmon is cooked throughout. Take the foil off of the top and baste the salmon with the sauce in the foil. Broil for 3-5 minutes or until brown and caramelized. Garnish with lemon slices and chopped parsley if desired.'
		],
		prepTime: 5,
		cookTime: 25,
		servingSize: 4,
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

