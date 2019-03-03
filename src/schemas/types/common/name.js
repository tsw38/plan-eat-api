const FIELDS = require('../../fields');

const NameType = FIELDS.object({
	name: 'Name',
	description: '...',
	fields: () => ({
		first: FIELDS.string,
		last: FIELDS.string,
		middle:	FIELDS.string
	})
});

module.exports = {
	type: NameType
};