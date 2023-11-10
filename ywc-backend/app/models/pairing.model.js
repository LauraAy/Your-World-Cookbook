const { INTEGER, STRING, TEXT } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Pairing = sequelize.define("pairing", {
    pairingName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
    drinks: {
      type: Sequelize.TEXT
    },
    shows: {
      type: Sequelize.TEXT
    },
    games: {
      type: Sequelize.TEXT
    },
    books: {
      type: Sequelize.TEXT
    },
    music: {
      type: Sequelize.TEXT
    },
    decor: {
      type: Sequelize.TEXT
    },
    more: {
      type: Sequelize.TEXT
    },
    recipeOne: {
      type: Sequelize.INTEGER
    },
    recipeTwo: {
      type: Sequelize.INTEGER
    },
    recipeThree: {
      type: Sequelize.INTEGER
    }
  });

  return Pairing;
};