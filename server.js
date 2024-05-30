const express = require("express");
const exGqlHttp = require("express-graphql").graphqlHTTP;

const app = express();
// handle all graph-ql requests using the graphql HTTP handler
app.use(
  "/gql",
  exGqlHttp({ graphiql: true, schema: require("./schemas/gql") })
);

app.listen(5000, () => {
  console.log("Started");
});
