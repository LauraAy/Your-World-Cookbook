const { INTEGER } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Creator_Recipe = sequelize.define("creator_recipe", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true 
    },
    creatorId: {
      type: Sequelize.INTEGER
    },
    recipeId: {
      type: Sequelize.INTEGER
    }
})

  return Creator_Recipe;
};