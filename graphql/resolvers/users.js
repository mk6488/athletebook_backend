const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const { SECRET_KEY } = require('../../config')
const User = require('../../models/User')
const { validateRegisterInput, validateLoginInput } = require('../../util/validators')

function generateToken(user) {
  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    roll: user.roll
  }, SECRET_KEY, { expiresIn: '7d' })
}

module.exports = {
  Mutation: {
    login: async (_, { username, password }) => {
      const { valid, errors } = validateLoginInput(username, password)
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }
      const user = await User.findOne({ username })
      if (!user) {
        errors.general = 'User not found'
        throw new UserInputError('User not found', { errors })
      }

      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = 'Wrong credentials'
        throw new UserInputError('Wrong credentials', { errors })
      }

      const token = generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token
      }
    },

    register: async (_, { registerInput: { username, email, password, confirmPassword, firstName, lastName, roll, } }) => {
      // Validate user data
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword, firstName, lastName, roll)
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }
      // Check if username is already used
      let user = await User.findOne({ username })
      if (user) {
        throw new UserInputError('Username already taken', {
          errors: {
            username: 'This username is already taken'
          }
        })
      }
      // Check if email is already registered
      user = await User.findOne({ email })
      if (user) {
        throw new UserInputError('Email already registered', {
          errors: {
            email: 'This email address is already registered'
          }
        })
      }
      // hash password and create auth token
      password = await bcrypt.hash(password, 12)

      const newUser = new User({
        email,
        username,
        password,
        firstName,
        lastName,
        roll,
        createdAt: new Date().toISOString()
      })

      const res = await newUser.save()

      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token
      }
    }
  }
}