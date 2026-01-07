import { Container } from "@radix-ui/themes";
import LatestRecipes from "../components/LatestRecipes";
import Categories from "../components/Categories";
import ShareRecipe from "../components/ShareRecipe";
import Article from "../components/Article";
import Footer from "../components/Footer"
import CristmasRecipes from "../components/CristmasRecipes";
import { Metadata } from "next";



export default function Home() {
  return (
    <>
      <Container>
        <Categories />
        <LatestRecipes />
        <CristmasRecipes />
        <Article />
      </Container>
      <ShareRecipe />
      <Footer />
    </>
  );
}

export const metadata: Metadata = {
  title: "Vintage Flavour-Dashboard",
  description: "View a summary of recipes"
}
