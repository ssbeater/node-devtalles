const { http } = require("../plugins");

async function getPokemonById (id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const pokemon = await http.get(url);
  return pokemon.name;
  
  // return fetch(url)
  //   .then((resp) => resp.json())
  //   .then((pokemon) => pokemon.name);
};

module.exports = {
  getPokemonById,
};
