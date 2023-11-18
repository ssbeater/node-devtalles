import { getPokemonNameById } from "../../src/js-foundation/06-promises";

describe("Promises", () => {

  test("getPokemonId should return a pokemon", async () => {
    const pokemonId = 1;
    const pokemonName = await getPokemonNameById(pokemonId);

    expect(pokemonName).toBe("bulbasaur");
  });

  test("getPokemonId should return error if pokemon doesnt exist", async () => {
    const pokemonId = 9999999999;
    
    try {
      const pokemonName = await getPokemonNameById(pokemonId);
    } catch (error) {
      expect(error).toBe("Pokemon not found with that id 9999999999");  
    }
  });
});