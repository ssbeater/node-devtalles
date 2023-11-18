import { httpClient } from "../plugins";

export async function getPokemonNameById (id: number | string): Promise<string> {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemon = await httpClient.get(url);
    return pokemon.name as string;
  } catch (error) {
    throw `Pokemon not found with that id ${id}`
  }
};
 