module.exports = app => {
    const UserRecipes = require("../controllers/userRecipes.controller.js");
    var router = require("express").Router();

    //Retrieve all users with their recipes
    router.get("/", UserRecipes.findAllUsersRecipes);

    //search username to retrieve user with recipes
    router.get("/search", UserRecipes.searchUserRecipes);
    
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

  

    //Search by username
    router.get("/all/search", UserRecipes.searchUserRecipes)

  app.use('/api/userRecipes', router);
  };