const FIELDS = require('../../fields');

const MealType = require('../../types/mealType/mealType');

const { getMealType, getMealTypes } = require('../../queries/mealType/mealType');

module.exports = {
	mealType: {
		type: MealType.type,
		args: {
			id: FIELDS.id
		},
		resolve: async (parent, args) => await getMealType(args.id)
	},
	mealTypes: {
		type: FIELDS.list(MealType.type),
		args: {
			id: MealType.defaultFields.id
		},
		resolve: async (parent, args) => {
			return await getMealTypes(args);
		}
	}
};