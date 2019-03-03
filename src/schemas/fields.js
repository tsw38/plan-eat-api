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
	object: (obj) => new GraphQLObjectType(obj),
	list: (type) => new GraphQLList(type)
}