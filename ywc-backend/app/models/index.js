const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.creator = require("../models/creator.model.js")(sequelize, Sequelize);
db.pairing = require("../models/pairing.model.js")(sequelize, Sequelize);
db.recipe = require("../models/recipe.model.js")(sequelize, Sequelize);
db.region_recipe = require("../models/region_recipe.model.js")(sequelize, Sequelize);
db.region = require("../models/region.model.js")(sequelize, Sequelize);
db.stateProvince = require("../models/stateProvince.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

//Define region_recipe join table
db.region_recipe = sequelize.define('region_recipes', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

//Define creator_recipe join table
db.creator_recipe = sequelize.define('creator_recipes', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

// Many to many relationship between recipes and regions.
db.region.belongsToMany(db.recipe, {
  through: "region_recipes",
  as: "recipe",
  foreignKey: "regionId",
  otherKey: "recipeId"
});
db.recipe.belongsToMany(db.region, {
  through: "region_recipes",
  as: "region",
  foreignKey: "recipeId",
  otherKey: "regionId"
});

//One to many relationship between regions and stateProvinces.
db.region.hasMany(db.stateProvince, { as: "stateProvinces" });
db.stateProvince.belongsTo (db.region, {
  foreignKey: "regionId",
  as: "regions",
});

//One to many relationship between recipes and pairings.
db.pairing.hasMany(db.recipe, { as: "recipes" });
db.recipe.belongsTo (db.pairing, {
  foreignKey: "pairingId",
  as: "pairings"
});

//Many to many relationship between creators and recipes.
db.creator.belongsToMany(db.recipe, {
  through: "creator_recipes",
  as: "recipe",
  foreignKey: "creatorId",
  otherKey: "recipeId"
});
db.recipe.belongsToMany(db.creator, {
  through: "creator_recipes",
  as: "creator",
  foreignKey: "recipeId",
  otherKey: "creatorId"
});

//One to many relationship between user and recipes.
db.user.hasMany(db.recipe, { as: "recipes" });
db.recipe.belongsTo (db.user, {
  foreignKey: "userId",
  as: "users",
});

//Many to many relationship between user and roles.
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;