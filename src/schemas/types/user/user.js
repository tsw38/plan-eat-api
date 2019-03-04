// Types
const Name     = require('../common/name');
const Nutrition= require('../common/nutrition');
const Settings = require('../common/settings');
const Favorites = require('./favorites');

// Fields
const FIELDS = require('../../fields');

// API
const {getUser} = require('../../queries/user/user');

// defaults
const defaultFields = {
	id: FIELDS.id,
	age: FIELDS.integer,
	email: FIELDS.string,
	password: FIELDS.string,
	isActive: FIELDS.boolean,
	lastLogin: FIELDS.biginteger,
	dietaryPreferences: {
		type: FIELDS.stringArray,
		resolve: ({dietaryPreferences}, args) => dietaryPreferences
	},
	allergies: {
		type: FIELDS.stringArray,
		resolve: ({allergies}, args) => allergies
	},
	bannedRecipes: {
		type: FIELDS.stringArray,
		resolve: ({bannedRecipes}, args) => bannedRecipes
	},
	recipeModifications: {
		type: FIELDS.stringArray,
		resolve: ({recipeModifications}, args) => recipeModifications
	}
};

const SimpleUserType = FIELDS.object({
	name: 'SimpleUser',
	description: '...',
	fields: () => ({
		id: FIELDS.id,
		name: {
			type: Name.type,
			resolve: ({name}, args) => name
		}
	})
});

const UserType = FIELDS.object({
	name: 'User',
	description: '...',
	fields: () => ({
		...defaultFields,
		joinedAccounts: {
			type: FIELDS.list(UserType),
			resolve: async (root, args) => {
				const {joinedAccounts} = root;
				return Promise.all(joinedAccounts.map(async (id) => await getUser(id)))
			}
		},
		name: {
			type: Name.type,
			resolve: ({name}, args) => name
		},
		settings: {
			type: Settings.type,
			resolve: ({settings}, args) => settings
		},
		nutrition: {
			type: Nutrition.type,
			resolve: ({nutrition}, args) => nutrition
		},
		favorites: {
			type: Favorites.type.default,
			resolve: ({favorites}, args) => favorites
		}
	})
});

module.exports = {
	type: {
		default: UserType,
		simple: SimpleUserType
	},
	defaultFields
};