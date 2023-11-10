module.exports = app => {
  const test = require("../controllers/recipeSome.controller.js");
  var router = require("express").Router();
    
  //Retrieve array of recipes by id
  router.get("/", test.findSome);


app.use('/api/someRecipes', router);
};