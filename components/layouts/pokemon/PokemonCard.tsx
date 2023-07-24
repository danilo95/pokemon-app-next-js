import { Grid, Card, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { pokemonsResults } from "../../../interfaces";

interface props {
  pokemon: pokemonsResults;
}

export const PokemonCard: FC<props> = ({ pokemon }) => {
  const router = useRouter();

  const onPokemonClick = () => {
    router.push(`/name/${pokemon.name}`);
  };

  const { id, img, name } = pokemon;
  return (
    <Grid key={id} xs={6} sm={3} md={2} xl={1}>
      <Card isHoverable variant="bordered" isPressable onClick={onPokemonClick}>
        <Card.Body css={{ p: 1 }}>
          <Card.Image src={img} width="100%" height="140px" />
          <Card.Footer>
            <Row justify="space-between">
              <Text transform="capitalize">{name}</Text>
              <Text>#{id}</Text>
            </Row>
          </Card.Footer>
        </Card.Body>
      </Card>
    </Grid>
  );
};
