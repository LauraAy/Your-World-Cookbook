const { INTEGER } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Region_Recipe = sequelize.define("region_recipe", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true 
    },
    regionId: {
      type: Sequelize.INTEGER
    },
    recipeId: {
      type: Sequelize.INTEGER
    }
})

  return Region_Recipe;
};