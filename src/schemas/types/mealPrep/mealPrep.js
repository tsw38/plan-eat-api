
// Fields
const FIELDS = require('../../fields');

// API
const {getTag} = require('../../queries/tag/tag');

// Types
const RecipeAndModType = FIELDS.object({
	name: 'RecipeAndModification',
	description: '...',
	fields: () => ({
		recipe: FIELDS.string,
		mealType: FIELDS.string
	})
})

const DayArrayType = FIELDS.object({
	name: 'DayArray',
	description: "...",
	fields: () => ({
		['_1']: {
			type: FIELDS.list(RecipeAndModType),
			resolve: (daysObj, args) => daysObj['_1']
		},
		['_2']: {
			type: FIELDS.list(RecipeAndModType),
			resolve: (daysObj, args) => daysObj['_2']
		},
		['_3']: {
			type: FIELDS.list(RecipeAndModType),
			resolve: (daysObj, args) => daysObj['_3']
		},
		['_4']: {
			type: FIELDS.list(RecipeAndModType),
			resolve: (daysObj, args) => daysObj['_4']
		}
		,['_5']: {
			type: FIELDS.list(RecipeAndModType),
			resolve: (daysObj, args) => daysObj['_5']
		}
		,['_6']: {
			type: FIELDS.list(RecipeAndModType),
			resolve: (daysObj, args) => daysObj['_6']
		},
		['_7']: {
			type: FIELDS.list(RecipeAndModType),
			resolve: (daysObj, args) => daysObj['_7']
		}
	})
});

const PreferenceType = FIELDS.object({
	name: 'MealPreference',
	description: "...",
	fields: () => ({
		mealType: FIELDS.string,
		customMealName: FIELDS.string,
		frequency: FIELDS.integer,
		totalCaloriePercentage: FIELDS.integer
	})
})

const defaultFields = {
	id: FIELDS.id,
	name: FIELDS.string,
	creationDate: FIELDS.float,
	userId: FIELDS.string,
};

const MealPrepType = FIELDS.object({
	name: 'MealPrep',
	description: '...',
	fields: () => ({
		...defaultFields,
		days: {
			type: DayArrayType,
			resolve: ({days}, args) => days
		},
		preferences: {
			type: FIELDS.list(PreferenceType),
			resolve: ({preferences}, args) => preferences
		}
	})
});

module.exports = {
	type: MealPrepType,
	defaultFields
};