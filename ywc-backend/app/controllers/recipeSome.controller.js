const db = require("../models");
const Recipe = db.recipe;
const Op = db.Sequelize.Op;

// Retrieve array of Recipes from the database by pk.
exports.findSome = (req, res) => {
  const recipeOne = req.body.recipeOne
  const recipeTwo = req.body.recipeTwo
  const recipeThree = req.body.recipeThree

  Recipe.findAll ({
    where: {[Op.or]: [{ id: recipeOne}, { id: recipeTwo},{ id: recipeThree}]} 
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Recipes."
      });
    });
};