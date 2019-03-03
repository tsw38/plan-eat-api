const FIELDS = require('../../fields');

const defaultFields = {
	id: FIELDS.id,
	name: FIELDS.string,
	description: FIELDS.string
};

const AllergyType = FIELDS.object({
	name: 'Allergy',
	description: '...',
	fields: () => ({
		...defaultFields
	})
});

module.exports = {
	type: AllergyType,
	defaultFields
};