const FIELDS = require('../../fields');

const IdType = FIELDS.object({
	name: 'SimpleId',
	description: '...',
	fields: () => ({
		id: FIELDS.id,
	})
});

module.exports = {
	type: IdType
};