module.exports = app => {
    const users = require("../controllers/user.controller.js");
    
    var router = require("express").Router();

//Retrieve all users
router.get("/", users.findAll);

//Retrieve user with id
router.get("/:id", users.findOne);

//Update a User with id
router.put("/:id", users.update);

//Delete a User with id
router.delete("/:id", users.delete);

//Delete all Users
router.delete("/", users.deleteAll);

app.use('/api/users', router);

};

