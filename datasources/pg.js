const { v4: uuidv4 } = require("uuid");
const { DataSource } = require("apollo-datasource");

class PostgresAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store.db;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  async mogs(userId = undefined) {
    const res = await this.store.Mog.findAll({
      include: [
        {
          model: this.store.Rating,
          as: "ratings",
        },
      ],
    });

    const mogs = res.map((mog) => {
      var userRating = null;
      if (userId) {
        userRating = mog.dataValues.ratings.find(
          (rating) => rating.dataValues.userId === userId
        );
      }

      return {
        id: mog.dataValues.id,
        userId: mog.dataValues.userId,
        mogName: mog.dataValues.mogName,
        imageUrl: mog.dataValues.imageUrl,
        itemList: mog.dataValues.itemList,
        itemOverrides: mog.dataValues.itemOverrides,
        race: mog.dataValues.race,
        gender: mog.dataValues.gender,
        bgColor: mog.dataValues.modelBgColor,
        createdAt: mog.dataValues.createdAt,
        ratingData: {
          numberOfRatings: mog.dataValues.ratings.length,
          averageRating:
            mog.dataValues.ratings.length > 0
              ? (mog.dataValues.ratings.reduce((a, b) => a + b.value, 0) *
                  1.0) /
                mog.dataValues.ratings.length
              : null,
          userRating: userRating,
        },
      };
    });

    return mogs;
  }

  async userMogs(userId) {
    const res = await this.store.Mog.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: this.store.Rating,
          as: "ratings",
        },
      ],
    });

    const mogs = res.map((mog) => {
      var userRating = mog.dataValues.ratings.find(
        (rating) => rating.dataValues.userId === userId
      );

      // console.log(mog.dataValues.ratings.length, "test");
      // console.log(
      //   mog.dataValues.ratings.reduce((a, b) => a + b.value, 0) * 1.0
      // );

      return {
        id: mog.dataValues.id,
        userId: mog.dataValues.userId,
        mogName: mog.dataValues.mogName,
        imageUrl: mog.dataValues.imageUrl,
        itemList: mog.dataValues.itemList,
        itemOverrides: mog.dataValues.itemOverrides,
        race: mog.dataValues.race,
        gender: mog.dataValues.gender,
        bgColor: mog.dataValues.modelBgColor,
        createdAt: mog.dataValues.createdAt,
        ratingData: {
          numberOfRatings: mog.dataValues.ratings.length,
          averageRating:
            mog.dataValues.ratings.length > 0
              ? (mog.dataValues.ratings.reduce((a, b) => a + b.value, 0) *
                  1.0) /
                mog.dataValues.ratings.length
              : null,
          userRating: userRating,
        },
      };
    });

    return mogs;
  }

  async createMog(
    userId,
    mogName,
    imageUrl,
    itemList,
    itemOverrides,
    race,
    gender,
    bgColor
  ) {
    let id = uuidv4();

    const mog = await this.store.Mog.create({
      id,
      userId,
      mogName,
      imageUrl,
      itemList,
      itemOverrides,
      race,
      gender,
      modelBgColor: bgColor,
    }).then((mog) => {
      console.log("Mog created.");
    });

    return mog ? mog : null;
  }

  async deleteMog(id) {
    if (!id) return null;

    return await !!this.store.Mog.destroy({
      where: {
        id: id,
      },
    }).then(() => {
      console.log("Mog deleted.");
    });
  }

  async getRatingForMog(mogId) {
    const ratings = await this.store.Rating.findAll({
      where: {
        mogId: mogId,
      },
    });

    const sum = ratings.reduce((a, b) => a + b.value, 0);
    return sum / len(ratings);
  }

  // --------------------------------

  async createRating(userId, mogId, value) {
    const rating = await this.store.Rating.create({
      userId: userId,
      mogId: mogId,
      value: value,
    }).then((rating) => {
      console.log("Mog created.");
    });

    return rating ? rating : null;
  }

  // --------------------------------

  async createUserInfo(firebaseUid, username) {
    const user = await this.store.UserInfo.create({
      firebaseUid,
      username,
    }).then((user) => {
      console.log("UserInfo created.");
    });

    return user ? user : null;
  }

  async getUsernames(firebaseUid, username) {
    const user = await this.store.UserInfo.create({
      firebaseUid,
      username,
    }).then((user) => {
      console.log("UserInfo created.");
    });

    return user ? user : null;
  }

  // ---------------------------------

  async getItemsInformation(ids) {
    const items = await this.store.Item.findAll({
      where: {
        id: ids,
      },
      attributes: [
        "id",
        "name",
        "itemLevel",
        "displaySlot",
        "displayId",
        "relatedDisplayIds",
      ],
      order: [
        this.store.sequelize.literal(
          `ARRAY_POSITION(ARRAY[${ids}]::integer[], "id")`
        ),
      ],
    });

    return items ? items : [];
  }
}

module.exports = PostgresAPI;
