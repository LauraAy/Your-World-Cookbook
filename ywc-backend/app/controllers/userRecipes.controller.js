const db = require("../models");
const recipeSomeRoutes = require("../routes/recipeSome.routes");
const Creator = db.creator;
const Recipe = db.recipe;
const User = db.user;
const Region = db.region
const Op = db.Sequelize.Op;

//Find all recipes with userId
exports.findUserRecipes= (req, res) => {
  const userId = req.params.id;
  var userIdCondition = userId ? { userId: { [Op.like]: `%${userId}%` }} : null;
  
  Recipe.findAll({where: {[Op.and]: [userIdCondition]} })
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
      message: `Cannot find User with id=${id}.`
        });
    }
  })
  .catch(err => {
    res.status(500).send({
    message: "Error retrieving User with id=" + id
    });
  });
};

//search recipes with userId by title
exports.searchUserRecipesTitle= (req, res) => {
  const userId = req.params.id;
  const title = req.query.title;
  var userIdCondition = userId ? { userId: { [Op.like]: `%${userId}%` }} : null;
  var titleCondition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Recipe.findAll({
    where: {[Op.and]: [userIdCondition, titleCondition]},
  })
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
      message: `Cannot find User with id=${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving the Regions."
   });
  });
};

//find creators with recipes by userId
exports.findUserRecipesCreator = (req, res) => {
  const userId = req.params.id;
  var userIdCondition = userId ? { userId: { [Op.like]: `%${userId}%` }} : null;

  Creator.findAll ({
    include: [ 
      {
        model: Recipe,
        as: "recipe",
        where: { [Op.and]: [userIdCondition] }
      }],
    })
    .then(data => { 
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving the Creators."
      });
    });
  };

//search recipes with userId by creatorName
exports.searchUserRecipesCreator = (req, res) => {
  const userId = req.params.id;
  const creatorName = req.query.creatorName;
  var creatorNameCondition = creatorName ? { creatorName: { [Op.like]: `%${creatorName}%` } } : null;
  var userIdCondition = userId ? { userId: { [Op.like]: `%${userId}%` }} : null;
  
  Creator.findAll ({
    where: {
    [Op.or]: [
      creatorNameCondition
    ]},
    include: [ 
      {
        model: Recipe,
        as: "recipe",
        where: { [Op.and]: [userIdCondition] }
      }],
    })
    .then(data => { 
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving the Creators."
      });
    });
  };

  //find regions with recipes by userId
  exports.findUserRecipesRegion= (req, res) => {
    const userId = req.params.id;
    var userIdCondition = userId ? { userId: { [Op.like]: `%${userId}%` }} : null;


    Region.findAll ({
      include: [ 
        {
          model: Recipe,
          as: "recipe",
          where: { [Op.and]: [userIdCondition] }
        }],
      })
      .then(data => { 
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
          err.message || "Some error occurred while retrieving the Creators."
        });
      });
    };

//search recipes with userId by country or regionName
exports.searchUserRecipesRegion= (req, res) => {
  const userId = req.params.id;
  const country = req.query.country;
  const regionName = req.query.regionName;
  var countryCondition = country ? { country: { [Op.like]: `%${country}%` } } : null;
  var regionCondition = regionName ? { regionName: { [Op.like]: `%${regionName}%` } } : null;
  var userIdCondition = userId ? { userId: { [Op.like]: `%${userId}%` }} : null;

  Region.findAll ({
    where: {
    [Op.or]: [
      countryCondition,
      regionCondition
    ]},
    include: [ 
      {
        model: Recipe,
        as: "recipe",
        where: { [Op.and]: [userIdCondition] }
      }],
    })
    .then(data => { 
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving the Creators."
      });
    });
  };
  
