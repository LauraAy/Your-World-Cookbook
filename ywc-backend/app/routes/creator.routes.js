module.exports = app => {
    const creators = require("../controllers/creator.controller.js");
    
    var router = require("express").Router();

    //Create a new Creator
    router.post("/", creators.create);

    //Retrieve all Creators
    router.get("/", creators.findAll);

    //Retrieve a single Creator with id
    router.get("/:id", creators.findOne);

    //Update a Creator with id
    router.put("/:id", creators.update);

    //Delete a Creator with id
    router.delete("/:id", creators.delete);

    //Delete all Creators
    router.delete("/", creators.deleteAll);

    //Retrieve all Creators with Recipes
    router.get("/recipes", creators.findAllCreatorRecipes);

    //Retrieve one Creator with Recipes
    router.get("/recipes/:id", creators.findCreatorRecipes);

    app.use('/api/creators', router);
};