const uuid = require('uuid');
const Ingredient = require('../../types/ingredient/ingredient');
const Nutrition = require('../../types/common/nutrition');
const FIELDS = require('../../fields');

// const User = require('../../types/user/user');

const { addIngredient } = require('../../queries/ingredient/ingredient');


const AddIngredientMutation = {
	type: Ingredient.type,
	description: "Add a new ingredient to the database",
	args: {
        name: FIELDS.string,
        unit: FIELDS.boolean,
        nutrition: {
            type: Nutrition.inputExpandedType,
            description: '...',
            resolve: (parent, {nutrition}, context) => nutrition
        }
	},
	resolve: async (_, args, context) => {
        const addUserResp = await addIngredient(args);

		return {
            id: addUserResp.id
        }
	}
};

const DeleteIngredientMutation = {
	// type: FIELDS.string,
	// description: "Add a user to the database",
	// args: {
	// 	id: FIELDS.id
	// },
	// resolve: async (parent, args) => {
	// 	const deleteUserResp = await deleteUser(args);
	// 	return deleteUserResp;
	// }
};

const EditIngredientMutation = {
	// type: FIELDS.string,
	// description: "Add a user to the database",
	// args: {
	// 	id: FIELDS.id
	// },
	// resolve: async (parent, args) => {
	// 	const deleteUserResp = await deleteUser(args);
	// 	return deleteUserResp;
	// }
};

module.exports = {
	addIngredient: AddIngredientMutation,
	// deleteUser: DeleteUserMutation
}