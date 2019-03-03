// Types
const Id  = require('../common/id');
const User  = require('../user/user');
const Source = require('../common/link');
const Nutrition= require('../common/nutrition');

// Fields
const {
	id,
	list,
	float,
	string,
	object,
	integer
} = require('../../fields');

// API
const {getUser} = require('../../queries/user/user');

// defaults
const defaultFields = {
	id,
	name: string,
	notes: string,
	prepTime: integer,
	cookTime: integer,
	description: string,
	servingSize: integer
};

const RatingType = object({
	name: 'RecipeRating',
	description: '...',
	fields: () => ({
		id,
		rating: float
	})
});

// ingredients
// directions
// images
// tag

const RecipeType = object({
	name: 'Recipe',
	description: '...',
	fields: () => ({
		...defaultFields,
		uploadedBy: {
			type: User.type.simple,
			resolve: async (root, args) => {
				const {uploadedBy} = root;
				return await getUser(uploadedBy);
			}
		},
		source: {
			type: Source.type,
			resolve: ({source}, args) => source
		},
		ratings: {
			type: list(RatingType),
			resolve: ({ratings}, args) => ratings
		},
		tags: {
			type: list(Id.type),
			resolve: ({tags}, args) => tags.map(id => ({id}))
		}
	})
});

module.exports = {
	type: RecipeType,
	defaultFields
};