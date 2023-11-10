const { DECIMAL, STRING, INTEGER } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const stateProvince = sequelize.define("stateProvince", {
   
    stateName: {
        type: Sequelize.STRING
    },
    stateCode: {
      type:Sequelize.STRING
    },
    region: {
      type: Sequelize.STRING
    }, 
    division: {
      type: Sequelize.STRING
    },
    lat: {
      type: Sequelize.DECIMAL(8,6)
    },
    lng: {
      type: Sequelize.DECIMAL(9,6)
    }
  });
  return stateProvince;
};