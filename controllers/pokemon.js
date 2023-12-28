const express = require("express");
const router = express.Router();

const pokemon = require("../models/pokemon.js");

// /**
//  * INDEX ROUTE
//  */

router.get("/", (req, res) => {
  res.render("./pokemon/index.ejs", { pokemon });
});

// /**
//  * NEW ROUTE
//  */
router.get("/new", (req, res) => {
  const newId = getNewId(pokemon);
  res.render("./pokemon/new.ejs", { pokemon, newId });
});

//function to generate new id
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
router.post("/", (req, res) => {
  const body = req.body;
  const type = body.type;
  body.type = type.split(",");
  pokemon.push(body);
  console.log(body);
  res.redirect("/pokemon");
});
// /**
//  * EDIT ROUTE
//  */
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  const poke = pokemon[id];
  res.render("./pokemon/edit.ejs", { poke, id });
});

// /**
//  * UPDATE ROUTE
//  */
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const image = body.img.toLowerCase();

  const newData = {
    id: body.id,
    name: body.name,
    img: body.img.toLowerCase(),
    type: body.type.split(","),
  };
  pokemon[id] = { ...pokemon[id], ...newData };
  res.redirect("/pokemon");
});

// /**
//  * DELETE ROUTE
//  */
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  pokemon.splice(id, 1);
  res.redirect("/pokemon");
});
// /**
//  * SHOW ROUTE
//  */
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const poke = pokemon[id];
  res.render("./pokemon/show.ejs", { poke, id });
});

module.exports = router;
