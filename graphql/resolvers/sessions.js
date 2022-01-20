const { AuthenticationError, UserInputError } = require('apollo-server')
const { argsToArgsConfig } = require('graphql/type/definition')
const { validateCreateSessionInput } = require('../../util/validators')

const Session = require('../../models/Session')
const checkAuth = require('../../util/check-auth')

module.exports = {
  Query: {
    getSessions: async () => {
      try {
        const sessions = await Session.find().sort({ createdAt: -1 })
        return sessions
      } catch (err) {
        throw new Error(err)
      }
    },

    getSession: async (_, { sessionId }) => {
      try {
        const session = await Session.findById(sessionId)
        if (!session) {
          throw new Error('Session not found')
        }
        return session
      } catch (err) {
        throw new Error(err)
      }
    }
  },

  Mutation: {
    createSession: async (_, { sessionInput: { type, date, info } }, context) => {
      const user = checkAuth(context)

      const { valid, errors } = validateCreateSessionInput(type, date, info)
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      const newSession = new Session({
        type,
        date,
        info,
        user: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        roll: user.roll,
        createdAt: new Date().toISOString()
      })

      const session = await newSession.save()

      return session
    },

    deleteSession: async (_, { sessionId }, context) => {
      const session = await Session.findById(sessionId)
      await session.delete()
      return 'Session deleted successfully'
      // const user = checkAuth(context)

      // try {
      //   const session = await Session.findById(sessionId)
      //   if (user.username === session.username) {
      //     await session.delete()
      //     return 'Session deleted successfully'
      //   } else {
      //     throw new AuthenticationError('Action not allowed')
      //   }
      // } catch (err) {
      //   throw new Error(err)
      // }
    },

    attendSession: async (_, { sessionId }, context) => {
      const { username } = checkAuth(context)

      const session = await Session.findById(sessionId)
      if (session) {
        if (session.attendees.find(attendee => attendee.username === username)) {
          // Session already attending, un-attend it
          session.attendees = session.attendees.filter((attendee) => attendee.username !== username)
        } else {
          //Session not yet attending, attend it
          session.attendees.push({
            username,
            createdAt: new Date().toISOString()
          })
        }
        await session.save()
        return session
      } else throw new UserInputError('Session not found')
    }
  }
}