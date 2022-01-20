const { gql } = require('apollo-server')

module.exports = gql `
  type Query {
      getSessions: [Session]!
      getSession(sessionId: ID!): Session!
  }
  
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!

    createSession(sessionInput: SessionInput): Session!
    deleteSession(sessionId: ID!): String!
    createComment(sessionId: ID!, text: String!): Session!
    deleteComment(sessionId: ID!, commentId: ID!): Session!
    attendSession(sessionId: ID!): Session!
  }
  
  type Session {
    id: ID!
    type: String!
    date: String!
    info: String!
    username: String!
    firstName: String!
    lastName: String!
    roll: String!
    createdAt: String!
    comments: [Comment]!
    attendees: [Attendee]!
    attendeeCount: Int!
    commentCount: Int!
  }

  type Comment {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    roll: String!
    text: String!
    createdAt: String!
  }

  type Attendee {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    roll: String!
    createdAt: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    roll: String!
    mobile: String
    brNumber: String
    dob: String
    dofe: String
    swimCapsize: String
    createdAt: String
    token: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    firstName: String!
    lastName: String!
    roll: String!
  }

  input SessionInput {
    type: String!
    date: String!
    info: String!
  }
`