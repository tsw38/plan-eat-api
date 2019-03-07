module.exports = {
	// resolvers
	...require('./resolvers/tag/tag'),
	...require('./resolvers/user/user'),
	...require('./resolvers/recipe/recipe'),
	...require('./resolvers/allergy/allergy'),
	...require('./resolvers/mealType/mealType'),
	...require('./resolvers/mealPrep/mealPrep'),
	...require('./resolvers/ingredient/ingredient')
}