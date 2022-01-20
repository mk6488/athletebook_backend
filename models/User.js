const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  roll: String,
  brNumber: String,
  dob: String,
  dofe: String,
  swimCapsize: String,
  mobile: String,
  createdAt: String
})

module.exports = model('User', userSchema)