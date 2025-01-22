import { Container, Em, Flex, Heading, Text } from '@radix-ui/themes'
import React from 'react'

const Article = () => {
  return (
    <Container my='9' p='4' pb='9'
       style={{ border: "solid var(--gray-a3) 1em", backgroundColor: "var(--mint-a1)", borderRadius: "8px"}}>
      <Heading
         align='center' my='5' size={{ initial : "8", md: '9'}}
         style={{ borderBottom: "4px solid var(--orange-a3)", paddingBottom: "0.5em" }}
         >Welcome to <Em className='orange'>Vintage Flavour</Em><Em>: A Journey Through Flavors</Em>
      </Heading>


      <Flex gap='6' mx='4' align="start" direction={{ initial: "column", md: "row"}} >

      <Text style={{ textIndent: "2em", lineHeight: "1.8", fontSize: "1.1rem"}} >Have you ever tasted something so delicious it instantly transported
        you to a cherished memory? That’s the magic of food—a universal language
        that connects us all. Welcome to <Em className='orange'>Vintage Flavour</Em>, a cozy corner of the
        internet where I share my passion for cooking, baking, and creating dishes
        that bring people together.</Text>
        <Text style={{ textIndent: "2em", lineHeight: "1.8", fontSize: "1.1rem"}}>Why I Started This Blog? The idea for this blog was born out of my love
         for food and storytelling. I’ve always believed that every recipe has a
         story—whether it’s a childhood favorite, a family heirloom, or a dish inspired
         by travels to far-off places. Here, I’ll be blending ingredients with personal
         anecdotes to make your cooking journey as flavorful as the dishes themselves.</Text>
         <Text style={{ textIndent: "2em", lineHeight: "1.8", fontSize: "1.1rem"}}>Join Me in the Kitchen! I hope <Em className='orange'>Vintage Flavour</Em> becomes your go-to resource for
          recipe inspiration and a space where we can connect over our shared love of food. Feel free to leave comments,
          share your own cooking experiences, and even request recipes you woud like to see on the blog.So, grab your apron, and let’s get cooking!</Text>

 </Flex>
    </Container>
  )
}

export default Article
