const mongoose = require('mongoose')
const { ApolloServer } = require("apollo-server")

const { MONGODB } = require('./config')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

mongoose.connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected')
    return server.listen({ port: 5000 })
  })
  .then(res => {
    console.log(`Server running at ${res.url}`)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
})