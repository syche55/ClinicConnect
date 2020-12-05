const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Availability {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
}

type User {
    _id: ID!
    email: String!
    password: String
    bookedAvailability: [Booking!]
    isDoctor: Boolean
    token: String
}

type Booking {
    _id: ID!
    availability: Availability!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type AuthData {
    userId: ID!
    isDoctor: Boolean!
    token: String!
    tokenExpiration: Int!
}

input AvailabilityInput {
    title: String!
    description: String!
    price: Float!
    date: String!
}

input UserInput {
    email: String!
    password: String!
    isDoctor: Boolean
}

type RootQuery {
    user: [User!]!
    availability: [Availability!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createAvailability(availabilityInput: AvailabilityInput): Availability
    createUser(userInput: UserInput): User
    bookAvailability(availabilityId: ID!): Booking!
    cancelBooking(bookingId: ID!): Availability!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)