module.exports = app => {
    
    const everything = require("../controllers/everything.controller.js");
    
    var router = require("express").Router();
    
    //Retreive all Recipes with regions, creators, and pairings
       router.get("/", everything.findRecipesEverything);
    
    //Retrieve one Creator with Recipes
       router.get("/:id", everything.findRecipeEverything);

    app.use('/api/everything', router);
    };