const db = require("../models");
const Recipe = db.recipe;
const Op = db.Sequelize.Op;

// Create and Save a new Recipe
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

   //create recipe
  const recipe = {
    title: req.body.title,
    description: req.body.description,
    recipeType: req.body.recipeType,
    servingSize: req.body.servingSize,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
    published: req.body.published ? req.body.published : false,
    userId: req.body.userId
  };

  // Save Recipe in the database
Recipe.create(recipe)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Recipe."
      });
    });
};

// Retrieve all Regions from the database.
exports.findAll = (req, res) => {
  Region.findAll ()
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

// Retrieve all Recipes from the database by title.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Recipe.findAll({ where: condition })
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



// Find a single Recipe with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Recipe.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Recipe with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Recipe with id=" + id
      });
    });
};

// Update a Recipe by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Recipe.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Recipe was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Recipe with id=${id}. Maybe Recipe was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Recipe with id=" + id
      });
    });
};

// Delete a Recipe with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Recipe.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Recipe was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Recipe with id=${id}. Maybe Recipe was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Recipe with id=" + id
      });
    });
};

// Delete all Recipes from the database.
exports.deleteAll = (req, res) => {
  Recipe.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Recipes were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Recipes."
      });
    });
};

// find all published Recipes
exports.findAllPublished = (req, res) => {
  Recipe.findAll({ where: { published: true } })
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

// Retrieve array of Recipes from the database by pk.
exports.findSome = (req, res) => {
  const recipeOne = req.body.recipeOne
  const recipeTwo = req.body.recipeTwo
  const recipeThree = req.body.recipeThree

  Recipe.findAll ({
    where: {[Op.and]: [{ id: recipeOne}, { id: recipeTwo},{ id: recipeThree}]} 
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