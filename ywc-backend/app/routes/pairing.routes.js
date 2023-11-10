module.exports = app => {
    const pairings = require("../controllers/pairing.controller.js");
    
    var router = require("express").Router();

    //Create a new Pairing
    router.post("/", pairings.create);

    //Retrieve all Pairings
    router.get("/", pairings.findAll);

    //Retrieve a single Pairing with id
    router.get("/:id", pairings.findOne);

    //Update a Pairing with id
    router.put("/:id", pairings.update);

    //Delete a Pairing with id
    router.delete("/:id", pairings.delete);

    //Delete all Pairings
    router.delete("/", pairings.deleteAll);

    app.use('/api/pairings', router);
};