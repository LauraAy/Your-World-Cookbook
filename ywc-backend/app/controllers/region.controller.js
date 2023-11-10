const db = require("../models");
const Region = db.region;
const Op = db.Sequelize.Op;

// Create and Save a new Region
exports.create = (req, res) => {

  const region = {
    regionName: req.body.regionName,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    lat: req.body.lat,
    lng: req.body.lng,
  };


  // Save Region in the database
Region.create(region)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Region."
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

// Find a single Region with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Region.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Region with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Region with id=" + id
      });
    });
};

// Retrieve all Regions from the database with options to retrieve by country or regionName.
exports.findAll = (req, res) => {
  
  Region.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Regions."
      });
    });
};


// Retrieve all Regions from the database with options to retrieve by country or regionName.
exports.searchAll = (req, res) => {
  const country = req.query.country;
  const regionName = req.query.regionName;
  var countryCondition = country ? { country: { [Op.like]: `%${country}%` } } : null;
  var regionCondition = regionName ? { regionName: { [Op.like]: `%${regionName}%` } } : null;

  Region.findAll({ where: {
    [Op.or]: [
      countryCondition,
      regionCondition
    ]
    } 
   })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Regions."
      });
    });
};

// Update a Region by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Region.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Region was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Region with id=${id}. Maybe Region was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Region with id=" + id
      });
    });
};

// Delete a Region with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Region.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Region was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Region with id=${id}. Maybe Region was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Region with id=" + id
      });
    });
};

// Delete all Regions from the database.
exports.deleteAll = (req, res) => {
  Region.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Regions were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Regions."
      });
    });
};