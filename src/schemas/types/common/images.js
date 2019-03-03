const FIELDS = require('../../fields');

const ImagesType = FIELDS.object({
	name: 'Images',
	description: '...',
	fields: () => ({
		full: FIELDS.string,
		thumbnail: FIELDS.string
	})
});

module.exports = {
	type: {
		default: ImagesType
	}
};