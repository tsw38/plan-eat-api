const FIELDS = require('../../fields');

const LinkType = FIELDS.object({
	name: 'Link',
	description: '...',
	fields: () => ({
		name: FIELDS.string,
		url: FIELDS.string
	})
});

module.exports = {
	type: LinkType
};