const FIELDS = require('../../fields');

const defaultFields = {
	id: FIELDS.id,
	name: FIELDS.string
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