import { Prisma } from '../generated/prisma/client'
import prisma from '@/lib/prisma'
import { Container } from '@radix-ui/themes'
import RecipeActions from '@/components/RecipeActions'
import Pagination from '@/components/Pagination'
import RecipeCard from '@/components/RecipeCard'


interface Props {
  searchParams: Promise<{
    page: string;
    categories: string;
    orderBy: keyof Prisma.RecipeOrderByWithRelationInput;
  }>
}

const Recipes = async ({ searchParams }: Props) => {
  const resolvedParams = await searchParams;

  // Configurare Paginare
  const pageSize = 6;
  const page = parseInt(resolvedParams.page) || 1;

  // Logica de filtrare
  const category = resolvedParams.categories;
  const where = category ? { categories: category } : {};

  // Interogare Prisma cu Filtru + Paginare
  const recipes = await prisma.recipe.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      assignedToUser: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  const recipeCount = await prisma.recipe.count({ where });
  return (
    <div className="py-12">
      <Container className="max-w-7xl mx-auto px-4">

        {/* Actions Bar */}
        <div className="mb-12">
          <RecipeActions />
        </div>

        {/* Recipes List/Grid */}
        <div className="space-y-8 mb-12">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination itemCount={recipeCount} pageSize={pageSize} currentPage={page} />

      </Container>
    </div>
  )
}


export const dynamic = 'force-dynamic';
export default Recipes;