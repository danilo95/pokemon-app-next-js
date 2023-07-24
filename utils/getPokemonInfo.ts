import { pokeApi } from "../api";
import { PokemonProps } from "../interfaces";

export const getPokemonInfo = async (nameOrId: string) => {
  try {
    const { data } = await pokeApi.get<PokemonProps>(`/pokemon/${nameOrId}`);
    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
    };
  } catch (error) {
    return null;
  }
};
