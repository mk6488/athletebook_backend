const { model, Schema } = require('mongoose')

const sessionSchema = new Schema({
  type: String,
  date: String,
  info: String,
  username: String,
  firstName: String,
  lastName: String,
  createdAt: String,
  comments: [{
    username: String,
    firstName: String,
    lastName: String,
    roll: String,
    text: String,
    createdAt: String
  }],
  attendees: [{
    username: String,
    firstName: String,
    lastName: String,
    roll: String,
    createdAt: String
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

module.exports = model('Session', sessionSchema)