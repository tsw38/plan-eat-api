const FIELDS = require('../../fields');

const Ingredient = require('../../types/ingredient/ingredient');
const Nutrition = require('../../types/common/nutrition');

const { getIngredient, getIngredients } = require('../../queries/ingredient/ingredient');

module.exports = {
	ingredient: {
		type: Ingredient.type,
		args: {
			id: FIELDS.id
		},
		resolve: async (parent, args) => await getIngredient(args.id)
	},
	ingredients: {
		type: FIELDS.list(Ingredient.type),
		args: {
			id: Ingredient.defaultFields.id
		},
		resolve: async (parent, args) => {
			return await getIngredients(args);
		}
    }
};