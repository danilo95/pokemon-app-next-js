import { useTheme, Text, Spacer, Link } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import NextLink from "next/link";

const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0px 20px",
        backgroundColor: theme?.colors.gray100.value,
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
        alt="pokemon Icon"
        width={50}
        height={50}
      />

      <NextLink href="/" passHref>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text color="white" h2>
            P
          </Text>
          <Text color="white" h3>
            okémon
          </Text>
        </div>
      </NextLink>
      <Spacer css={{ flex: 1 }} />
      <NextLink href="/favorites" passHref>
        <div>
          <Text color="white">Favorites</Text>
        </div>
      </NextLink>
    </div>
  );
};

export default Navbar;
