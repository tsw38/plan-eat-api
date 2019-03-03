const FIELDS = require('../../fields');
const User = require('../../types/user/user');
const { getUser, getUsers } = require('../../queries/user/user');

module.exports = {
	user: {
		type: User.type.default,
		args: {
			id: FIELDS.id
		},
		resolve: async (parent, args) => await getUser(args.id)
	},
	users: {
		type: FIELDS.list(User.type.default),
		args: User.defaultFields,
		resolve: async (parent, args) => {
			return await getUsers(args);
		}
	}
};