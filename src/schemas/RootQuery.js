const graphql = require("graphql");
const Schemas = require("./schema");
const FIELDS =  require('./fields');

const {GraphQLSchema} = graphql;

const RootQuery = FIELDS.object({
  name: "RootQueryType",
  fields: {
    ...Schemas
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
