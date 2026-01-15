import Article from "@/components/Article";
import Categories from "@/components/Categories";
import CristmasRecipes from "@/components/CristmasRecipes";
import Footer from "@/components/Footer";
import LatestRecipes from "@/components/LatestRecipes";
import ShareRecipe from "@/components/ShareRecipe";
import { Container } from "@radix-ui/themes";
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
  )
}

export const metadata: Metadata = {
  title: "Vintage Flavour-Dashboard",
  description: "View a summary of recipes"
}
