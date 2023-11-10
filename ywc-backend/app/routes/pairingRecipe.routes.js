module.exports = app => {
    
   const pairingRecipes = require("../controllers/pairingRecipe.controller.js");
   
   var router = require("express").Router();
      
      //Retreive all Pairings with Recipes
      router.get("/", pairingRecipes.findAllPairingRecipes);
   
      //Retreive all Recipes with Pairings
      router.get("/recipes", pairingRecipes.findAllRecipePairings);
   
      //Retrieve one Pairing with Recipes
      router.get("/:id", pairingRecipes.findPairingRecipes);
   
      //Retrieve one Recipe with Pairing
      router.get("/recipes/:id", pairingRecipes.findRecipePairings);
   
       //Remove one Pairing from Recipe
       router.delete("/:recipeId/:pairingId", pairingRecipes.removePairing);
   
      app.use('/api/pairingRecipes', router);
   };