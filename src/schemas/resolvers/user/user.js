const FIELDS = require('../../fields');
const User = require('../../types/user/user');
const { getUser, getUsers, signIn, signOut, getDisplayName } = require('../../queries/user/user');

module.exports = {
	user: {
		type: User.type.default,
		args: {
			id: FIELDS.id
		},
		resolve: async (_, args) => await getUser(args.id)
    },
	users: {
		type: FIELDS.list(User.type.default),
		args: User.defaultFields,
		resolve: async (_, args) => {
			return await getUsers(args);
		}
    },
    signIn: {
        type: User.type.signIn,
        args: {
            email: FIELDS.string,
            password: FIELDS.string
        },
        resolve: async (_, {email, password}, {req, res}) => await signIn({email, password, req, res})
    },
    signOut: {
        type: User.type.signIn,
        args: {
            email: FIELDS.string,
            password: FIELDS.string
        },
        resolve: async (_, __, {req, res}) => {
            return await signOut({req, res});
        }
    },
    userDisplayName: {
        type: User.type.signIn,
        args: {
            id: FIELDS.string
        },
        resolve: async (_, args, {req, res}) => await getDisplayName(args)
    }
};