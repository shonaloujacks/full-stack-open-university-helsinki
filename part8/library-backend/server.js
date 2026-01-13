const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const resolvers = require('./resolvers')
const typeDefs = require('./schema')

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const startServer = async () => {
  const response = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })
  const url = response.url
  console.log(`Server ready at ${url}`)
}

module.exports = startServer
