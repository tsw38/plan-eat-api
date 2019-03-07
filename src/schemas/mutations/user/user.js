const uuid = require('uuid');

const FIELDS = require('../../fields');

const User = require('../../types/user/user');

const {addUser} = require('../../queries/user/user');


const AddUserMutation = {
	type: User.type.default,
	description: "Add a user to the database",
	args: {
		firstName: FIELDS.string,
		lastName: FIELDS.string,
		email: FIELDS.string,
	},
	resolve: async (parent, args) => {
		const addUserResp = await addUser(args);
		return addUserResp;
	}
};

const DeleteUserMutation = {
	type: FIELDS.string,
	description: "Add a user to the database",
	args: {
		id: FIELDS.id
	},
	resolve: async (parent, args) => {
		const deleteUserResp = await deleteUser(args);
		return deleteUserResp;
	}
};

module.exports = {
	addUser: AddUserMutation,
	// deleteUser: DeleteUserMutation
}