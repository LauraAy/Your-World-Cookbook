const { STRING, TEXT } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Creator = sequelize.define("creator", {
    creatorName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    about: {
      type: Sequelize.TEXT
    },
    link: {
      type: Sequelize.TEXT
    }
  });

  return Creator;
};