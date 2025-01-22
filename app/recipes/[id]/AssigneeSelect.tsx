'use client'
import Skeleton from '@/app/components/Skeleton'
import { Recipe, User } from '@prisma/client'
import { Container, Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import React from 'react'


const AssigneeSelect = ({ recipe }: { recipe: Recipe} ) => {

  const { data: users, error, isLoading } = useQuery<User[]>({

    //queryKey il folosim pt a identifica 'users' in cache
    queryKey: ['users'],

    //queryFn este o functie pt a fetch data si stored in cache
    queryFn: () => axios.get('/api/users').then(res => res.data),

    //stale se asigura ca nu se trimite un nou request timp de 1 minut
    staleTime: 60 * 1000,

    //rect incearca de 3 ori sa fetch data
    retry: 3
  })

  if( isLoading ) return <Skeleton/>;
  if ( error ) return null;

  const assignRecipe = async (userId: string) => {
    try {
      await axios.patch('/api/recipes/' + recipe.id,
        {assignedToUserId: userId === "unassigned" ? null : userId})
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Changes could not be saved.")
    }
  }

  return (
    <Container maxWidth={{ initial: '90vw', md: '80vw', xl: '60vw' }}>
    <Select.Root
        size='3'
        defaultValue={recipe.assignedToUserId || "unassigned"}
        onValueChange={assignRecipe}
    >
      <Select.Trigger  mb='3' mt='3' ml='2'  placeholder='Assign recipe...'/>
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value='unassigned'>Unassigned</Select.Item>
          {users?.map ( user => (
            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
    <Toaster/>
  </Container>
  )
}

export default AssigneeSelect
