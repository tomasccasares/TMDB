const express = require("express");
const app = express();
const db = require("./config/index");
const routes = require("./routes/");
const User = require("./models/users");
const Favorite = require("./models/favorites");
const Index = require("./models/index");
const Tv = require("./models/Tv");

const port = 3001;

app.use(express.json());

app.use("/api", routes);
app.use("/api", (req, res) => {
  res.sendStatus(404);
});

db.sync({ force: false })
  .then(() => {
    app.listen(port, () =>
      console.log(`Servidor escuchando en el puerto: ${port}`)
    );
  })
  .catch(console.error);
