const usersResolvers = require('./users')
const sessionsResolvers = require('./sessions')
const commentsResolvers = require('./comments')

module.exports = {
  Session: {
    attendeeCount: (parent) => parent.attendees.length,
    commentCount: (parent) => parent.comments.length
  },
  Query: {
    ...sessionsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...sessionsResolvers.Mutation,
    ...commentsResolvers.Mutation
  }
}