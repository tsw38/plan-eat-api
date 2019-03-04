// Types
const {ID}   = require('../common/generics');
const Source = require('../common/link');
const Images = require('../common/images');
const RecipeRating = require('../common/recipeRating');

// Fields
const {
	id,
	list,
	string,
	object,
	integer,
	stringArray
} = require('../../fields');

// API

// defaults
const defaultFields = {
	id,
	name: string,
	notes: string,
	prepTime: integer,
	cookTime: integer,
	uploadedBy: string,
	description: string,
	servingSize: integer,
	source: {
		type: Source.type,
		resolve: ({source}, args) => source
	},
	ratings: {
		type: list(RecipeRating.type),
		resolve: ({ratings}, args) => ratings
	},
	tags: {
		type: stringArray,
		resolve: ({tags}, args) => tags
	},
	ingredients: {
		type: list(ID.quantity),
		resolve: ({ingredients}, args) => ingredients
	},
	directions: {
		type: stringArray,
		resolve: ({directions}, args) => directions
	},
	images: {
		type: Images.type.default,
		resolve: ({images}, args) => images
	}
};

const RecipeType = object({
	name: 'Recipe',
	description: '...',
	fields: () => ({
		...defaultFields
	})
});

module.exports = {
	type: RecipeType,
	defaultFields
};