'use client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';
import React from 'react'


const categories: {label: string, value?: string, id: string}[]=[
  {label: "All", id: "all"},
  {label: "Breakfast", value: "Breakfast", id: "Breakfast"},
  {label: "Lunch", value: "Lunch", id: "Lunch"},
  {label: "Dinner", value: "Dinner", id: "Dinner"},
  {label: "Appetizer", value: "Appetizer", id: "Appetizer"},
  {label: "Salad", value: "Salad", id: "Salad"},
  {label: "Main-course", value: "Main-course", id: "Main-course"},
  {label: "Side-dish", value: "Side-dish", id: "Side-dish"},
  {label: "Dessert", value: "Dessert", id: "Dessert"},
  {label: "Christmas", value: "Christmas", id: "Christmas"},
]

const RecipeFilter = () => {

  const router = useRouter();

  return (
    <Select.Root onValueChange={(category) => {
      const query = category === "All" ? "" : `?categories=${category}`
      router.push('/recipes/list' + query)
    }}>
      <Select.Trigger placeholder='Filter by categories...' variant="surface"/>
      <Select.Content  color="orange">
        {categories.map( category => (
          <Select.Item  key={category.id} value={category.value?? "All"}>
            {category.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default RecipeFilter
