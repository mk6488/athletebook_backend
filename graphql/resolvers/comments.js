const { UserInputError, AuthenticationError } = require('apollo-server-errors')

const Session = require('../../models/Session')
const checkAuth = require('../../util/check-auth')

module.exports = {
  Mutation: {
    createComment: async (_, { sessionId, text }, context) => {
      const { username } = checkAuth(context)
      if (text.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            text: 'Comment text must not be empty'
          }
        })
      }

      const session = await Session.findById(sessionId)

      if (session) {
        session.comments.unshift({
          text,
          username,
          createdAt: new Date().toISOString()
        })
        await session.save()
        return session
      } else throw new UserInputError('Session not found')
    },

    deleteComment: async (_, { sessionId, commentId }, context) => {
      const { username } = checkAuth(context)

      const session = await Session.findById(sessionId)

      if (session) {
        const commentIndex = session.comments.findIndex((c) => c.id === commentId)

        if (session.comments[commentIndex].username === username) {
          session.comments.splice(commentIndex, 1)
          await session.save()
          return session
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } else {
        throw new UserInputError('Session not found')
      }
    }
  }
}