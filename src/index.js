const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const { join } = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
  },

  // mutations
  Mutation: {
    post: (parent, args, context, info) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      })
      return newLink;
    }
  },
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: {
    prisma,
  }
});

server
  .listen()
  .then(({ url }) =>
    console.log(`🚀 Server ready at ${url}`)
  );
