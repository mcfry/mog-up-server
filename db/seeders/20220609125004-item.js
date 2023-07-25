"use strict";

// https://wow.tools/dbc/
const itemJson = require("../../datasources/itemsearchname.json");
const itemAppearanceInfoJson = require("../../datasources/itemmodifiedappearance.json");
const itemDisplayJson = require("../../datasources/itemappearance.json");

// push all ids, change id in DB to not be primary and create multiple, and ask user if any are wrong
const itemAppearanceInfoJsonById = {};
const itemAppearanceInfoJsonByIdRelated = {};
for (let item of itemAppearanceInfoJson) {
  itemAppearanceInfoJsonById[item.ItemID] = item;

  if (item.ItemID in itemAppearanceInfoJsonByIdRelated) {
    itemAppearanceInfoJsonByIdRelated[item.ItemID].push(item);
  } else {
    itemAppearanceInfoJsonByIdRelated[item.ItemID] = [item];
  }
}
// for (let item of itemAppearanceInfoJson) {
//   if (
//     item.ItemID in itemAppearanceInfoJsonById &&
//     item.ItemAppearanceModifierID <
//       itemAppearanceInfoJsonById[item.ItemID].ItemAppearanceModifierID
//   ) {
//     itemAppearanceInfoJsonById[item.ItemID] = item;
//   } else if (!(item.ItemID in itemAppearanceInfoJsonById)) {
//     itemAppearanceInfoJsonById[item.ItemID] = item;
//   }
// }

const itemDisplayJsonById = {};
for (let item of itemDisplayJson) {
  itemDisplayJsonById[item.ID] = item;
}

const getDisplayId = (itemId) => {
  return itemDisplayJsonById[
    itemAppearanceInfoJsonById[itemId].ItemAppearanceID
  ].ItemDisplayInfoID;
};

const getDisplayIdRelated = (itemId) => {
  const relatedIds = [];

  for (let item of itemAppearanceInfoJsonByIdRelated[itemId]) {
    relatedIds.push(
      itemDisplayJsonById[item.ItemAppearanceID].ItemDisplayInfoID
    );
  }

  // Reverse so main appearance is first listed
  return relatedIds.reverse();
};

const getDisplaySlot = (itemId) => {
  return itemDisplayJsonById[
    itemAppearanceInfoJsonById[itemId].ItemAppearanceID
  ].DisplayType;
};

const slimmedItemJson = [];
for (let item of itemJson) {
  // only create if the item has an appearance (no mounts etc)
  if (
    item.ID in itemAppearanceInfoJsonById &&
    itemAppearanceInfoJsonById[item.ID].ItemAppearanceID in itemDisplayJsonById
  ) {
    slimmedItemJson.push({
      id: item.ID,
      name: item.Display_lang,
      itemLevel: item.ItemLevel,
      displaySlot: getDisplaySlot(item.ID),
      displayId: getDisplayId(item.ID),
      relatedDisplayIds: [...new Set(getDisplayIdRelated(item.ID))],
    });
  }
}

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    console.log("Seeding items into db.");
    let n = slimmedItemJson.length;
    for (let i = 0; i < n; i += 1000) {
      await queryInterface.bulkInsert(
        "Items",
        slimmedItemJson.slice(i, i + 1000 < n ? i + 1000 : undefined),
        {}
      );
      console.log("Seeded 1000 items");
    }

    //await queryInterface.bulkInsert("Items", slimmedItemJson, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Items", null, {});
  },
};
