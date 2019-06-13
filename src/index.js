const { GraphQLServer } = require("graphql-yoga");
const data = require("./fake-data");
const filterData = require("./filter-data");

const resolvers = {
  Query: {
    people: (_, args) => filterData({ data, ...args })
  }
};

const server = new GraphQLServer({ typeDefs: "src/schema.graphql", resolvers });
server.start({ port: 4002 }, () =>
  console.log("Server is running on localhost:4000")
);
