// Types
const Nutrition = require('../common/nutrition');
const Tag = require('../tag/tag');

// Fields
const FIELDS = require('../../fields');

// API
const {getTag} = require('../../queries/tag/tag');


const defaultFields = {
	id: FIELDS.id,
	name: FIELDS.string,
	unit: FIELDS.boolean
};

const IngredientType = FIELDS.object({
	name: 'Ingredient',
	description: '...',
	fields: () => ({
		...defaultFields,
		nutrition: {
			type: Nutrition.expandedType,
			resolve: ({nutrition}, args) => nutrition
		},
		category: {
			type: Tag.type.default,
			resolve: async ({category}, args) => await getTag(category)
		}
	})
});

module.exports = {
	type: IngredientType,
	defaultFields
};