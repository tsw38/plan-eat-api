const FIELDS = require('../../fields');

const IdType = FIELDS.object({
	name: 'Id',
	description: '...',
	fields: () => ({
		id: FIELDS.id,
	})
});

const IdQuantityType = FIELDS.object({
	name: 'IdQuantity',
	description: '...',
	fields: () => ({
		id: FIELDS.id,
		quantity: FIELDS.float
	})
});

const IdNameType = FIELDS.object({
	name: 'IdName',
	description: '...',
	fields: () => ({
		id: FIELDS.id,
		name: FIELDS.string
	})
});

module.exports = {
	ID: {
		default: IdType,
		name: IdNameType,
		quantity: IdQuantityType,
	},
};