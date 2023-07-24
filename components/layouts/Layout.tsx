import { FC } from "react";
import Head from "next/head";
import Navbar from "./ui/Navbar";

interface Props {
  children: React.ReactNode;
  title?: string;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{`${title || "Pokemon App"}`}</title>
        <meta name="author" content="Danilo Rivera"></meta>
        <meta name="descripcion" content="Informacion sobre el pokemon"></meta>
        <meta name="keywords" content="xxx , pokemon, pokedex"></meta>
        <meta property="og:title" content={`Information about ${title}`} />
        <meta
          property="og:description"
          content={`Sprites and images about ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>
      <Navbar />
      <main style={{ padding: "0px 20px" }}>{children}</main>
    </>
  );
};
