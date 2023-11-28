const express = require("express");
const http = require('http')
const Server = require("socket.io").Server
const app = express();
const path = require('path')
const cors = require("cors");

const server = http.createServer(app)
const io = new Server(server , {
  cors:{
    origin:"*"
  }
})

const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../ywc-frontend/build");

app.use(express.static(buildPath))

app.get("/*", function(req, res){
  res.sendFile(
    path.join(__dirname, "../ywc-frontend/build/index.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
        }
      );

})

io.on("connection" , (socket) => {
  console.log('We are connected')

  socket.on("chat" , chat => {
    io.emit('chat' , chat)
  } )

  socket.on('disconnect' , ()=> {
    console.log('disconnected')
  })
})

// var corsOptions = {
//   origin: "http://localhost:5001"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

// const run = async () => {
// };

//Start it up
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to Custom Cookbook!" });
// });

//routes
require("./app/routes/recipe.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/creator.routes')(app);
require('./app/routes/creatorRecipe.routes')(app);
require("./app/routes/region.routes")(app);
require('./app/routes/regionRecipe.routes')(app);
require('./app/routes/pairing.routes')(app);
require('./app/routes/pairingRecipe.routes')(app);
require('./app/routes/everything.routes')(app);
require('./app/routes/recipeSome.routes')(app);
require('./app/routes/userRecipe.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


