'use client'

import { Recipe, User } from '../app/generated/prisma/client'
import { Container, Select, Flex } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { Skeleton } from '@heroui/react'


const AssigneeSelect = ({ recipe }: { recipe: Recipe }) => {
  const { data: users, error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3
  })

  if (isLoading) return <Skeleton />;
  if (error) return null;

  const assignRecipe = async (userId: string) => {
    const promise = axios.patch('/api/recipes/' + recipe.id, {
      assignedToUserId: userId === "unassigned" ? null : userId
    });


    await toast.promise(promise, {
      loading: 'Saving changes...',
      success: 'Recipe assigned successfully! 👨‍🍳',
      error: 'Changes could not be saved.',
    });
  };

  return (
    <Container size="2">
      <Flex direction="column" align={{ initial: 'stretch', sm: 'start' }} gap="2">


        <Select.Root
          size="3"
          defaultValue={recipe.assignedToUserId || "unassigned"}
          onValueChange={assignRecipe}
        >
          <Select.Trigger
            variant="surface"
            color="bronze"
            className="cursor-pointer transition-all hover:shadow-sm"
            placeholder="Assign recipe..."
          />
          <Select.Content position="popper" sideOffset={5}>
            <Select.Group>
              <Select.Label>Suggestions</Select.Label>
              <Select.Item value="unassigned" className="cursor-pointer italic text-gray-400">
                Unassigned
              </Select.Item>
              {users?.map(user => (
                <Select.Item key={user.id} value={user.id} className="cursor-pointer">
                  {user.name}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>

      {/* Toaster configurat pentru a apărea sus în centru */}
      <Toaster position="top-center" reverseOrder={false} />
    </Container>
  )
}

export default AssigneeSelect