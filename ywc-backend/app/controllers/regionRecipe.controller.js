const db = require("../models");
const Region = db.region;
const Recipe = db.recipe;
const RegionRecipe = db.region_recipe;
const Op = db.Sequelize.Op;

//Add Recipe to Region
exports.createRegionRecipe = (req, res) => {

  const regionRecipe = {
    regionId: req.body.regionId,
    recipeId: req.body.recipeId
  };

  RegionRecipe.create(regionRecipe)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the recipe to region."
      });
    });
};
//Find all regions with recipes
exports.findRegionRecipes = (req, res) => {
  Region.findAll ({
    include: [ 
      {
        model: Recipe,
        as: "recipe",
      }],
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving the Regions."
      });
    });
  };


//Find all regions with recipes by country or regionName
exports.searchRegionRecipes = (req, res) => {
  const country = req.query.country;
  const regionName = req.query.regionName;
  var countryCondition = country ? { country: { [Op.like]: `%${country}%` } } : null;
  var regionCondition = regionName ? { regionName: { [Op.like]: `%${regionName}%` } } : null;
  
  Region.findAll ({where: {
    [Op.or]: [
      countryCondition,
      regionCondition
    ]},
    include: [ 
      {
        model: Recipe,
        as: "recipe",
      }],
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving the Regions."
      });
    });
  };

//Find a single region with recipes
exports.findOneRegionRecipe = (req, res) => {
        const id = req.params.id;
      
        Region.findByPk(id, {
        include: [ 
         {
          model: Recipe,
          as: "recipe",
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
    };

//Find all recipes with regions
    exports.findRecipeRegions = (req, res) => {
    
      Recipe.findAll({
      include: [ 
       {
        model: Region,
        as: "region",
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
  };

    //Find a single recipe with regions
exports.findOneRecipeRegion = (req, res) => {
    const id = req.params.id;
  
    Recipe.findByPk(id, {
    include: [ 
     {
      model: Region,
      as: "region",
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
};
  
//remove region from recipe
  exports.removeRegion = (req, res) => {
    const recipeId = req.params.recipeId;
    const regionId = req.params.regionId 

    RegionRecipe.destroy({
      where: {regionId: regionId, recipeId: recipeId}
    })
      .then(nums => {
        res.send({ message: `${nums} region_recipes were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing region_recipes."
        });
      });  
}