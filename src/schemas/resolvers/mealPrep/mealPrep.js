const FIELDS = require('../../fields');

const MealPrep = require('../../types/mealPrep/mealPrep');

const { getMealPrep, getMealPreps } = require('../../queries/mealPrep/mealPrep');

module.exports = {
	mealPrep: {
		type: MealPrep.type,
		args: {
			id: FIELDS.id
		},
		resolve: async (parent, args) => await getMealPrep(args.id)
	},
	mealPreps: {
		type: FIELDS.list(MealPrep.type),
		args: {
			id: MealPrep.defaultFields.id
		},
		resolve: async (parent, args) => {
			return await getMealPreps(args);
		}
	}
};