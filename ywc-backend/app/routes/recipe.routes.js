module.exports = app => {
    const recipes = require("../controllers/recipe.controller.js");
    
    var router = require("express").Router();

    //Create a new Recipe
    router.post("/", recipes.create);

    //Retrieve all Recipes
    router.get("/", recipes.findAll);

    //Retrieve a single Recipe with id
    router.get("/:id", recipes.findOne);

    //Update a Recipe with id
    router.put("/:id", recipes.update);

    //Add Region to Recipe
    router.put("/addregion/:id", recipes.update);

    //Delete a Recipe with id
    router.delete("/:id", recipes.delete);

    //Delete all Recipes
    router.delete("/", recipes.deleteAll);

    app.use('/api/recipes', router);
};