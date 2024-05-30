const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

const CompanyType = new GraphQLObjectType({
  name: "Company",
  // using the arrow function to resolve the circular reference that'll be generated from the 'UserType' field.
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return (
          axios
            // Guess that's how json-server@^0.16.1 works out relations.
            // Other DB/API fetching will have their own resolution ways.
            .get(`http://localhost:3000/companies/${parentValue.id}/users`)
            .then((res) => res.data)
        );
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  // Defining the 'fields' object here as an arrow function isn't really necessary
  // Since no circular reference is generated with the 'CompanyType' Object.
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then((res) => res.data);
      },
    },
  }),
});

// Create entry queries for all root entities in the database.
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  // each field is an entity here.
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(_parentValue, args) {
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((res) => res.data);
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(_parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
