module.exports = app => {
    
  const creatorRecipes = require("../controllers/creatorRecipe.controller.js");
    
  var router = require("express").Router();
      
  //Add creator to recipe
  router.post("/", creatorRecipes.createCreatorRecipe);

  //Retreive all Creators with Recipes
  router.get("/", creatorRecipes.findCreatorRecipes);

  //Retrieve all creators by creatorName search
  router.get("/search", creatorRecipes.searchCreatorRecipes);
    
  //Retreive all Recipes with Creators
  router.get("/recipes", creatorRecipes.findRecipeCreators);
    
  //Retrieve one Creator with Recipes
  router.get("/:id", creatorRecipes.findOneCreatorRecipe);
    
  //Retrieve one Recipe with Creator
  router.get("/recipes/:id", creatorRecipes.findOneRecipeCreator);
    
  //Delete one creator from a recipe
  router.delete("/:recipeId/:creatorId", creatorRecipes.removeCreator);

  app.use('/api/creatorRecipes', router);
};