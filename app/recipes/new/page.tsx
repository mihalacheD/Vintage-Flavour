import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import RecipeForm from "@/components/RecipeForm";


const NewRecipePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
    <RecipeForm />
  )
}

export default NewRecipePage;
export const dynamic = 'force-dynamic'
