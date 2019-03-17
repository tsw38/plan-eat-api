const FIELDS = require('../../fields');

const defaultFields = {
	id: FIELDS.id,
    name: FIELDS.string,
    isGrocerSection: FIELDS.boolean
};

const TagType = FIELDS.object({
	name: 'Tag',
	description: '...',
	fields: () => ({
		...defaultFields
	})
});

module.exports = {
	type: {
		default: TagType
	},
	defaultFields
};