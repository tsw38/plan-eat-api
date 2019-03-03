// Types
const Allergy  = require('../allergy/allergy');

// Fields
const FIELDS = require('../../fields');

// API


const NutritionType = FIELDS.object({
	name: 'Nutrition',
	description: '...',
	fields: () => ({
		calories: FIELDS.integer,
		protein: FIELDS.integer,
		carbs: FIELDS.integer,
		fat: FIELDS.integer
	})
});

const CarbsType = FIELDS.object({
	name: 'Carbs',
	description: '...',
	fields: () => ({
		absolute: FIELDS.float,
		dietaryFiber: FIELDS.float,
		sugar: FIELDS.float
	})
});

const ExpandedNutritionType = FIELDS.object({
	name: 'ExpandedNutrition',
	description: '...',
	fields: () => ({
		calories: FIELDS.float,
		protein: FIELDS.float,
		fat: FIELDS.float,
		carbs: {
			type: CarbsType,
			resolve: ({carbs}, args) => carbs
		},
		sodium: FIELDS.float,
		cholesterol: FIELDS.float,
		allergies: {
			type: FIELDS.stringArray,
			resolve: async ({allergies}, args) => allergies
		}
	})
})

module.exports = {
	type: NutritionType,
	expandedType: ExpandedNutritionType
};