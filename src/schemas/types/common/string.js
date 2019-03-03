const FIELDS = require('../../fields');

const StringType = FIELDS.object({
	name: 'String',
	description: '...',
	fields: () => ({
		text: FIELDS.string,
	})
});

module.exports = {
	type: {
		default: StringType
	}
};