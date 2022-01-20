module.exports.validateRegisterInput = (username, email, password, confirmPassword, firstName, lastName, roll) => {
  const errors = {}
  if (username.trim() === "") {
    errors.username = 'Username must not be empty'
  }
  if (email.trim() === "") {
    errors.email = 'Email must not be empty'
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address'
    }
  }
  if (password === "") {
    errors.password = 'Password must not be empty'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match'
  }
  if (firstName.trim() === "") {
    errors.firstName = 'First Name must not be empty'
  }
  if (lastName.trim() === "") {
    errors.lastName = 'Last Name must not be empty'
  }
  if (roll.trim() === "") {
    errors.roll = 'Roll must not be empty'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

module.exports.validateLoginInput = (username, password) => {
  const errors = {}
  if (username.trim() === "") {
    errors.username = 'Username must not be empty'
  }
  if (password === "") {
    errors.password = 'Password must not be empty'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}

module.exports.validateCreateSessionInput = (type, date, info) => {
  const errors = {}
  if (type.trim() === "") {
    errors.type = 'Type must not be empty'
  }
  if (date.trim() === "") {
    errors.date = 'Date must not be empty'
  }
  if (info.trim() === "") {
    errors.info = 'Info must not be empty'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  }
}