const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const pokemonRouter = require("./controllers/pokemon.js");
const pokemon = require("./models/pokemon.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(express.static("public"));
//app.use("/pokemon", pokemonRouter);
// /**
//  * INDEX ROUTE
//  */
app.get("/pokemon", (req, res) => {
  res.render("./pokemon/index.ejs", { pokemon });
});

// /**
//  * NEW ROUTE
//  */
app.get("/pokemon/new", (req, res) => {
  const newId = getNewId(pokemon);
  res.render("./pokemon/new.ejs", { pokemon, newId });
});
function getNewId(array) {
  const ids = array.map((element) => {
    return Number(element.id);
  });
  let nextId = Math.max.apply(null, ids);
  nextId++;
  return nextId;
}
// /**
//  * CREATE ROUTE
//  */
app.post("/pokemon/", (req, res) => {
  const body = req.body;
  pokemon.push(body);
  res.redirect("/pokemon");
});

// /**
//  * EDIT ROUTE
//  */
app.get("/pokemon/:id/edit", (req, res) => {
  const id = req.params.id;
  const poke = pokemon[id];
  res.render("./pokemon/edit.ejs", { poke, id });
});

// /**
//  * UPDATE ROUTE
//  */
app.put("/pokemon/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  pokemon[id] = body;
  res.redirect("/pokemon");
});
// /**
//  * DELETE ROUTE
//  */

app.delete("/pokemon/:id", (req, res) => {
  const id = req.params.id;
  pokemon.splice(id, 1);
  res.redirect("/pokemon");
});

// /**
//  * SHOW ROUTE
//  */
app.get("/pokemon/:id", (req, res) => {
  const id = req.params.id;
  const poke = pokemon[id];
  res.render("./pokemon/show.ejs", { poke, id });
});

/**
 * LISTENER
 */
app.listen(3000, () => {
  console.log("listening on port 3000");
});
