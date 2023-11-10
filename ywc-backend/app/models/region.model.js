const { DECIMAL, STRING, INTEGER } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Region = sequelize.define("region", {
    country: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lat: {
      type: Sequelize.DECIMAL(8,6)
    },
    lng: {
      type: Sequelize.DECIMAL(9,6)
    },
    alpha2Code: {
      type: Sequelize.STRING
    },
    alpha3Code: {
      type: Sequelize.STRING
    },
    countryCode: {
      type: Sequelize.INTEGER
    },
    regionName: {
        type: Sequelize.STRING
    },
    subRegion: {
      type:Sequelize.STRING
    },
    intermediateRegion: {
      type: Sequelize.STRING
    }
  });
  return Region;
};