const FIELDS = require('../../fields');

const Recipe = require('../../types/recipe/recipe');
const {	getRecipe, getRecipes } = require('../../queries/recipe/recipe');

module.exports = {
	recipe: {
		type: Recipe.type,
		args: {
			id: FIELDS.id
		},
		resolve: async (parent, args) => await getRecipe(args.id)
	},
	// recipes: {
	// 	type: FIELDS.list(Recipe.type),
	// 	args: {
	// 		id: Recipe.defaultFields.id
	// 	},
	// 	resolve: async (parent, args) => {
	// 		return await getRecipes(args);
	// 	}
	// }
};