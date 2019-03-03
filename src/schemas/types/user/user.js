// Types
const Name     = require('../common/name');
const Allergy  = require('../allergy/allergy');
const Nutrition= require('../common/nutrition');
const Settings = require('../common/settings');

// Fields
const FIELDS = require('../../fields');

// API
const {getUser} = require('../../queries/user/user');
const {getAllergy} = require('../../queries/allergy/allergy');

// defaults
const defaultFields = {
	id: FIELDS.id,
	age: FIELDS.integer,
	lastLogin: FIELDS.biginteger,
	email: FIELDS.string,
	password: FIELDS.string,
	isActive: FIELDS.boolean
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
		allergies: {
			type: FIELDS.list(Allergy.type),
			resolve: async (root, args) => {
				const {allergies} = root;
				return Promise.all(allergies.map(async (id) => await getAllergy(id)));
			}
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