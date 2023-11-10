const { INTEGER, STRING, TEXT } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define("recipe", {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
    recipeType: {
      type: Sequelize.STRING
    },
    servingSize: {
      type: Sequelize.INTEGER
    },
    prepTime: {
      type: Sequelize.STRING
    },
    cookTime: {
      type: Sequelize.STRING
    },
    ingredients: {
      type: Sequelize.TEXT
    },
    directions: {
      type: Sequelize.TEXT
    },
    source: {
      type: Sequelize.TEXT
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Recipe;
};