const express = require("express");
const gqlHTTP = require("express-graphql").graphqlHTTP;

const app = express();
// handle all graph-ql requests using the graphql HTTP handler
app.use("/gql", gqlHTTP({ graphiql: true, schema: require("./schemas/gql") }));

app.listen(5000, () => {
  console.log("Server started at: http://localhost:" + 5000);
});
