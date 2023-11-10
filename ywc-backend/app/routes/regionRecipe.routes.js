module.exports = app => {
    
    const regionRecipes = require("../controllers/regionRecipe.controller.js");
    
    var router = require("express").Router();

    //Add recipe to region
    router.post("/", regionRecipes.createRegionRecipe);

    //Retrieve all regions with recipes
    router.get("/", regionRecipes.findRegionRecipes);

    //Retrieve all Regions by country or regionName search
    router.get("/search", regionRecipes.searchRegionRecipes);

    //Retrieve all recipes with regions
    router.get("/recipes", regionRecipes.findRecipeRegions);

    //Retrieve one region with recipes
    router.get("/:id", regionRecipes.findOneRegionRecipe);

    //Retrieve one recipe with regions
    router.get("/recipes/:id", regionRecipes.findOneRecipeRegion) 

    //Delete one region from a recipe
    router.delete("/:recipeId/:regionId", regionRecipes.removeRegion);
 

    app.use('/api/regionRecipes', router);
};