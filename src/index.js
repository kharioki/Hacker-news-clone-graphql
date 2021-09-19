const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const { join } = require('path');

let links = [
  {
    id: 'link-0',
    description: 'Fullstack GraphQL tutorial',
    url: 'http://howtographql.com/'
  }
]

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => links
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers
});

server
  .listen()
  .then(({ url }) =>
    console.log(`🚀 Server ready at ${url}`)
  );
