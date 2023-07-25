const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar JSON
  scalar DateTime

  type Query {
    allMogs(userId: ID): [Mog]!
    allUserMogs(userId: ID!): [Mog]!
    getRatingForMog(mogId: ID!): Int!
    getItemsInformation(ids: [ID!]!): [Item]!
  }

  type Mutation {
    createMog(
      userId: ID!
      mogName: String!
      imageUrl: String
      itemList: [Int!]
      itemOverrides: JSON
      race: Int
      gender: Int
      bgColor: String
    ): Mog
    createRating(userId: ID!, mogId: ID!, rating: Int!): Rating
    createUserInfo(firebaseUid: ID!, username: String): UserInfo
    deleteMog(id: ID!): Boolean!
  }

  type Mog {
    id: ID!
    userId: ID!

    mogName: String!
    imageUrl: String
    itemList: [Int!]
    itemOverrides: JSON
    race: Int
    gender: Int
    bgColor: String
    createdAt: DateTime
    ratingData: RatingMeta
  }

  type Rating {
    id: ID!
    userId: ID!
    mogId: ID!

    value: Int!
  }

  type UserInfo {
    username: String
    role: String
    firebaseUid: ID!
  }

  type Item {
    id: ID!
    name: String!
    itemLevel: Int!
    displaySlot: Int!
    displayId: Int!
    relatedDisplayIds: [Int!]
  }

  type RatingMeta {
    numberOfRatings: Int!
    averageRating: Float
    userRating: Rating
  }
`;

module.exports = typeDefs;
