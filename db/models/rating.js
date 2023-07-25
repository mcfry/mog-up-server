// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Rating extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Rating.belongsTo(models.Mog, {
//         as: 'mog',
//         foreignKey: 'mogId'
//       });
//     }
//   }
//   Rating.init({
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       allowNull: false
//     },
//     mogId: {
//       type: DataTypes.UUID,
//       allowNull: false,
//     },
//     value: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     }
//   }, {
//     sequelize,
//     modelName: 'Rating',
//   });
//   return Rating;
// };

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mogId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});

  Rating.associate = function(models) {
    // associations can be defined here
    Rating.belongsTo(models.Mog, {
      as: 'mog',
      foreignKey: 'mogId'
    });
  };
  
  return Rating;
};