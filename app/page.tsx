import { Container } from "@radix-ui/themes";
import LatestRecipes from "./LatestRecipes";
import Categories from "./Categories";
import ShareRecipe from "./ShareRecipe";
import Article from "./Article";
import Footer from "./Footer"
import CristmasRecipes from "./CristmasRecipes";
import { Metadata } from "next";


export default function Home() {
  return (
    <>
    <Container>
      <Categories/>
      <LatestRecipes/>
      <CristmasRecipes/>
      <Article/>
    </Container>
    <ShareRecipe/>
    <Footer/>
    </>
  );
}

export const metadata: Metadata = {
  title: "Vintage Flavour-Dashboard",
  description: "View a summary of recipes"
}
