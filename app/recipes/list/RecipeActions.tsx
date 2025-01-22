import { Button, Flex, Link } from '@radix-ui/themes'
import React from 'react'
import RecipeFilter from './RecipeFilter'

const RecipeActions = () => {
  return (
    <Flex  justify='between' align='baseline' direction={{ initial: "column-reverse", md: "row"}}>
      <Button size="4" variant="outline" color="gray" mt="6">
        <Link href="/recipes/new">New recipe</Link>
      </Button>
      <RecipeFilter/>
    </Flex>
  )
}

export default RecipeActions
