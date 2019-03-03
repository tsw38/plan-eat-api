const FIELDS = require('../../fields');


const RatingType = FIELDS.object({
	name: 'RecipeRating',
	description: '...',
	fields: () => ({
		id: FIELDS.id,
		rating: FIELDS.float
	})
});

module.exports = {
	type: RatingType
};