const db = require("../models");
const Pairing = db.pairing;
const Recipe = db.recipe;

//Find all Pairings with Recipes
exports.findAllPairingRecipes= (req, res) => {
  
    Pairing.findAll({ include: ["recipes"] })
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
    
    
    //Find one Pairing with Recipes
    exports.findPairingRecipes= (req, res) => {
      const id = req.params.id;
    
    Pairing.findByPk(id, { include: ["recipes"] })
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

//Find all Recipes with Pairings
exports.findAllRecipePairings= (req, res) => {
  
    Recipe.findAll({ include: ["pairings"] })
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
      message: "Error retrieving Pairing with id=" + id
    });
    });
    };

    //Find one Recipe with Pairings
        exports.findRecipePairings= (req, res) => {
            const id = req.params.id;
          
          Recipe.findByPk(id, { include: ["pairings"] })
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

    //remove pairing from recipe
      exports.removePairing = (req, res) => {
        const recipeId = req.params.recipeId
        const pairingId = req.params.pairingId 
    
        Pairing.findOne({
            where: { id: pairingId }
        }).then(pairing => {
            pairing.removeRecipes([recipeId])
            res.sendStatus(200);
        }).catch(e => console.log(e));
    }
    