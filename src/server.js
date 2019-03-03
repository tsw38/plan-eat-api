const express = require("express");
const graphqlHTTP = require("express-graphql");
const dotenv = require("dotenv");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const schema = require("./schemas/RootQuery");

dotenv.config();

const app = express();

app
  .get(
    "/playground",
    expressPlayground({
      endpoint: "/graphql"
    })
  )
  .use(
    "/graphql",
    graphqlHTTP({
      schema
    })
  );

app.listen(process.env.HTTP_PORT, () =>
  console.log(`Now browse to localhost:${process.env.HTTP_PORT}/graphql`)
);
