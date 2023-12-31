import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { pokeApi } from "../../api";
import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { PokemonProps } from "../../interfaces";
import { Card, Grid, Text, Button, Image, Container } from "@nextui-org/react";
import { getPokemonInfo, localStorage } from "../../utils/index";
import confeti from "canvas-confetti";

interface Props {
  pokemon: PokemonProps;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    localStorage.isExistPokemonInFavorites(pokemon.id)
  );

  const onToggleFavorite = () => {
    localStorage.toggleFavorites(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confeti({
      zIndex: 99,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <Layout title={`${pokemon.name}`}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height="200px"
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color="gradient"
                ghost={!isInFavorites}
                onClick={onToggleFavorite}
              >
                {!isInFavorites ? "  Save in Favorites" : "Favorite"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPokemons: string[] = [...Array(151)].map(
    (_, index) => `${index + 1}`
  );
  return {
    paths: allPokemons.map((id) => ({
      params: { id },
    })),
    //fallback: false,
    fallback: "blocking", //to allow incremental static generation ISG
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const pokemon = await getPokemonInfo(id);
  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      pokemon,
    },
    revalidate: 86400, // 24 hrs in seconds for incremental static Regeneration ISR
  };
};

export default PokemonPage;
