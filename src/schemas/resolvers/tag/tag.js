const FIELDS = require('../../fields');

const Tag = require('../../types/tag/tag');
const {getTag,getTags} = require('../../queries/tag/tag');

module.exports = {
	tag: {
		type: Tag.type.default,
		args: {
			id: FIELDS.id
		},
		resolve: async (parent, args) => await getTag(args.id)
	},
	tags: {
		type: FIELDS.list(Tag.type.default),
		args: {
			isGrocerSection: Tag.defaultFields.isGrocerSection
		},
		resolve: async (parent, args) => {
			return await getTags(args);
		}
    }
};