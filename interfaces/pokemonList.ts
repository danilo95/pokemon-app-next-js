export interface PokemonList {
  count: number;
  next?: string;
  previous?: string;
  results: pokemonsResults[];
}

export interface pokemonsResults {
  name: string;
  url: string;
  id: number;
  img: string;
}

export interface pokemonListProps {
  pokemons: pokemonsResults[];
}
