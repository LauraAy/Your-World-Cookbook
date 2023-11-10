const db = require("../models");
const Creator = db.creator;

// Create and Save a new creator
exports.create = (req, res) => {
 
  const creator = {
    creatorName: req.body.creatorName,
    about: req.body.about,
    link: req.body.link,
    recipe_id: req.body.recipeId
  };

  // Save Creator in the database
Creator.create(creator)
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

// Retrieve all Creators from the database.
exports.findAll = (req, res) => {
 
    Creator.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Creators."
      });
    });
};

// Find a single Creator with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Creator.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Creator with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Creator with id=" + id
      });
    });
};


// Update a Creator by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Creator.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Creator was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Creator with id=${id}. Maybe Recipe was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Creator with id=" + id
      });
    });
};

// Delete a Creator with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Creator.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Creator was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Creator with id=${id}. Maybe Recipe was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Creator with id=" + id
      });
    });
};

// Delete all Creators from the database.
exports.deleteAll = (req, res) => {
  Creator.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Creators were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Creators."
      });
    });
};

//Find all creators with recipes
exports.findAllCreatorRecipes= (req, res) => {
  
Creator.findAll({ include: ["recipes"] })
.then(data => {
if (data) {
  res.send(data);
} else {
  res.status(404).send({
    message: `Cannot find Creator with id=${id}.`
  });
}
})
.catch(err => {
res.status(500).send({
  message: "Error retrieving Creator with id=" + id
});
});
};


//Find one creator with recipes
exports.findCreatorRecipes= (req, res) => {
  const id = req.params.id;

Creator.findByPk(id, { include: ["recipes"] })
.then(data => {
if (data) {
  res.send(data);
} else {
  res.status(404).send({
    message: `Cannot find Creator with id=${id}.`
  });
}
})
.catch(err => {
res.status(500).send({
  message: "Error retrieving Creator with id=" + id
});
});
};