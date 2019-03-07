const {object, string, notNull} = require('../../fields');

const NameType = object({
	name: 'Name',
	description: '...',
	fields: () => ({
		first: string,
		last: string,
		middle:	string
	})
});

const InputNameType = object({
	name: 'InputName',
	description: '...',
	fields: () => ({
		first: notNull(string),
		last: notNull(string),
		middle:	notNull(string)
	})
});

module.exports = {
	type: {
		default: NameType,
		input: InputNameType
	}
};