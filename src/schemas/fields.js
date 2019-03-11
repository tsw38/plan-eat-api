const graphql = require('graphql');
const GraphQLBigInt = require('graphql-bigint');

const {
	GraphQLInputObjectType,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLBoolean,
	GraphQLString,
	GraphQLFloat,
	GraphQLList,
	GraphQLInt,
	GraphQLID
} = graphql;

module.exports = {
	id: {type: GraphQLID },
	integer: {type: GraphQLInt },
	biginteger: {type: GraphQLBigInt },
	float: {type: GraphQLFloat},
	string: {type: GraphQLString },
	boolean: {type: GraphQLBoolean},
	list: (type) => new GraphQLList(type),
	stringArray: new GraphQLList(GraphQLString),
    object: (obj) => new GraphQLObjectType(obj),
    input: (obj) => new GraphQLInputObjectType(obj),
	notNull: (obj) => new GraphQLNonNull(obj)
}