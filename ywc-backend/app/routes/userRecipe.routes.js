module.exports = app => {
    const UserRecipes = require("../controllers/userRecipes.controller.js");
    var router = require("express").Router();

    //Retreive all Recipes by user id
    router.get("/:id", UserRecipes.findUserRecipes);

    //Retrieve all Recipes by user id with title search
    router.get("/titleSearch/:id", UserRecipes.searchUserRecipesTitle);
    
    //Find all creators with recipes by user id
    router.get("/creators/:id", UserRecipes.findUserRecipesCreator);
    
    //Retrieve all Recipes by user id with title search
    router.get("/creatorSearch/:id", UserRecipes.searchUserRecipesCreator);

    //Find all regions with recipes by user id
    router.get("/regions/:id", UserRecipes.findUserRecipesRegion);

    //Retrieve all Recipes by user id with title search
    router.get("/regionSearch/:id", UserRecipes.searchUserRecipesRegion);

  app.use('/api/userRecipes', router);
  };