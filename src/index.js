const { ApolloServer } = require('apollo-server');

const typeDefs = `
  type Query {
    info: String!
  }
`
const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone'
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server
  .listen()
  .then(({ url }) =>
    console.log(`🚀 Server ready at ${url}`)
  );
