// Fields
const FIELDS = require('../../fields');

const FavoritesType = FIELDS.object({
	name: 'Favorites',
	description: '...',
	fields: () => ({
		mealPreps: {
			type:  FIELDS.stringArray,
			resolve: ({mealPrep}, args) => mealPrep
		},
		recipes: {
			type: FIELDS.stringArray,
			resolve: ({recipes}, args) => recipes
		}
	})
});

module.exports = {
	type: {
		default: FavoritesType
	}
};