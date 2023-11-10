const db = require("../models");
const Pairing = db.pairing;

// Create and Save a new Pairing
exports.create = (req, res) => {

  const pairing = {
    pairingName: req.body.pairingName,
    description: req.body.description,
    drinks: req.body.drinks,
    shows: req.body.shows,
    games: req.body.games,
    books: req.body.books,
    music: req.body.music,
    decor: req.body.decor,
    background: req.body.background,
    more: req.body.more,
    recipeOne: req.body.recipeOne,
    recipeTwo: req.body.recipeTwo,
    recipeThree: req.body.recipeThree
  };

  // Save Pairing in the database
Pairing.create(pairing)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pairing."
      });
    });
};

// Retrieve all Pairings from the database.
exports.findAll = (req, res) => {

  Pairing.findAll ()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Pairings."
      });
    });
};

// Find a single Pairing with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Pairing.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Pairing with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Pairing with id=" + id
      });
    });
};


// Update a Recipe by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Pairing.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pairing was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Pairing with id=${id}. Maybe Pairing was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Pairing with id=" + id
      });
    });
};

// Delete a Pairing with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Pairing.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pairing was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Pairing with id=${id}. Maybe Pairing was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Pairing with id=" + id
      });
    });
};

// Delete all Pairings from the database.
exports.deleteAll = (req, res) => {
  Pairing.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Pairings were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Pairings."
      });
    });
};  