import { GetStaticProps, NextPage } from "next";
import { Grid, Card, Row, Text } from "@nextui-org/react";
import { pokeApi } from "../api";
import { Layout } from "../components/layouts";
import { PokemonList, pokemonListProps, pokemonsResults } from "../interfaces";
import { PokemonCard } from "../components/layouts/pokemon";

const HomePage: NextPage<pokemonListProps> = ({ pokemons }) => {
  return (
    <Layout title="Listado de pokemons">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

//the data requeired to render the page is available at build time ahead of a user's requests
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonList>("/pokemon?limit=151");
  const pokemons: pokemonsResults[] = data.results.map((pokemon, i) => ({
    ...pokemon,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      i + 1
    }.svg`,
  }));

  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
