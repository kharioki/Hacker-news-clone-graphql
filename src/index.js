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
  // queries
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => links
  },

  // mutations
  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    }
  },
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
});

server
  .listen()
  .then(({ url }) =>
    console.log(`🚀 Server ready at ${url}`)
  );
