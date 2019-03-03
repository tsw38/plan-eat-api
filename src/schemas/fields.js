const graphql = require('graphql');
const GraphQLBigInt = require('graphql-bigint');

const {
	GraphQLObjectType,
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
	object: (obj) => new GraphQLObjectType(obj)
}