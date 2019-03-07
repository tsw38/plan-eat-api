const graphql  = require("graphql");
const {object} = require('./fields');
const Schemas  = require("./Schemas");
const Mutations= require('./Mutations');

const {GraphQLSchema} = graphql;

const RootQuery = object({
  name: "RootQueryType",
  fields: {
    ...Schemas
  }
});

const RootMutation = object({
  name: 'RootMutationType',
  fields: {
    ...Mutations
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
