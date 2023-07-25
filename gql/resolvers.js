const { JSONResolver, DateTimeResolver } = require("graphql-scalars");

// for more scalar options outside of defaults: https://www.graphql-scalars.dev/docs
module.exports = {
  JSON: JSONResolver,
  DateTime: DateTimeResolver,

  Query: {
    allMogs: async (_, { userId }, { dataSources }) =>
      dataSources.pgAPI.mogs(userId),
    allUserMogs: async (_, { userId }, { dataSources }) =>
      dataSources.pgAPI.userMogs(userId),
    getRatingForMog: async (_, { mogId }, { dataSources }) =>
      dataSources.pgAPI.getRatingForMog(mogId),
    getItemsInformation: async (_, { ids }, { dataSources }) =>
      dataSources.pgAPI.getItemsInformation(ids),
  },

  Mutation: {
    createMog: async (
      _,
      {
        userId,
        mogName,
        imageUrl,
        itemList,
        itemOverrides,
        race,
        gender,
        bgColor,
      },
      { dataSources }
    ) =>
      dataSources.pgAPI.createMog(
        userId,
        mogName,
        imageUrl,
        itemList,
        itemOverrides,
        race,
        gender,
        bgColor
      ),
    deleteMog: async (_, { id }, { dataSources }) =>
      dataSources.pgAPI.deleteMog(id),

    createRating: async (_, { userId, mogId, rating }, { dataSources }) =>
      dataSources.pgAPI.createRating(userId, mogId, rating),

    createUserInfo: async (_, { firebaseUid, username }, { dataSources }) =>
      dataSources.pgAPI.createUserInfo(firebaseUid, username),
  },
};
