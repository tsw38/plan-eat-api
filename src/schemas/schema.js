module.exports = {
	...require('./resolvers/tag/tag'),
	...require('./resolvers/user/user'),
	...require('./resolvers/recipe/recipe'),
	...require('./resolvers/allergy/allergy'),
	...require('./resolvers/ingredient/ingredient')
}