import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { FavoritePokemon } from "../../components/layouts/pokemon";
import { EmptyFavorites } from "../../components/layouts/ui";
import { localStorage } from "../../utils";

const FavoritePage = () => {
  const [favoritePokemons, setFavoritePokemos] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemos(localStorage.pokemons);
  }, []);

  return (
    <Layout title="Favorites">
      {favoritePokemons.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <FavoritePokemon favoritePokemons={favoritePokemons} />
      )}
    </Layout>
  );
};

export default FavoritePage;
