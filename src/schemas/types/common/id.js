const FIELDS = require('../../fields');

const IdType = FIELDS.object({
	name: 'SimpleId',
	description: '...',
	fields: () => ({
		id: FIELDS.id,
	})
});

const IdQuantityType = FIELDS.object({
	name: 'SimpleIdQuantity',
	description: '...',
	fields: () => ({
		id: FIELDS.id,
		quantity: FIELDS.float
	})
});

module.exports = {
	type: {
		default: IdType,
		quantity: IdQuantityType
	}
};