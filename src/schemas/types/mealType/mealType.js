// Fields

const { id, object, string } = require('../../fields');

// defaults
const defaultFields = {
	id,
	name: string,
};

const MealType = object({
	name: 'Meal',
	description: '...',
	fields: () => defaultFields
});

module.exports = {
	type: MealType,
	defaultFields
};