const { creator, pairing } = require("../models");
const db = require("../models");
const Recipe = db.recipe;
const Region = db.region;
const Creator = db.creator;
const Pairing =db.pairing

//Find all recipes with regions, creators, and pairings
exports.findRecipesEverything= (req, res) => {
    Recipe.findAll({
        include: [ 
         {
          model: Region,
          as: "region",
        },
        {
         model: Creator,
         as: "creator"
        },
        {
         model: Pairing,
         as: "pairings"
        }],
    })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving the Region."
          });
        });
    }
    //Find one recipe with regions, creators, and pairings
    exports.findRecipeEverything= (req, res) => {
      const id = req.params.id;
    
    Recipe.findByPk(id, { 
        include: [ 
            {
             model: Region,
             as: "region",
           },
           {
            model: Creator,
            as: "creator"
           },
           {
            model: Pairing,
            as: "pairings"
           }]
    })
    .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving the Region."
        });
      });
};

