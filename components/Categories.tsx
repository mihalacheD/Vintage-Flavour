'use client'
import { Grid, Text, Avatar } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'


const categories = [
  { label: 'All', id: 'all', imageUrl: 'https://static1.squarespace.com/static/53b839afe4b07ea978436183/53bbeeb2e4b095b6a428a13e/5fd2570b51740e23cce97919/1725651374258/traditional-food-around-the-world-Travlinmad.jpg?format=1500w' },
  { label: 'Breakfast', id: 'Breakfast', imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2017/08/smoothie-bowl-3a8632c.jpg?quality=90&resize=556,505' },
  { label: 'Lunch', id: 'Lunch', imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/harissa-chicken-and-farro-salad-healthy-lunch-ideas-1671486565.jpg?crop=0.6672222222222222xw:1xh;center,top&resize=980:*' },
  { label: 'Dinner', id: 'Dinner', imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Fish-Tacos-1337495.jpg?quality=90&resize=556,505' },
  { label: 'Appetizer', id: 'Appetizer', imageUrl: 'https://www.southernliving.com/thmb/EEWdxrBorv5JJ-Xpcppjz8EsthU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Mini_Potato_Skins_005-2c0f3c0747254639a8f72ea37e1819fd.jpg' },
  { label: 'Salad', id: 'Salad', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkbmEdqPCaryXon_xcg7zD-gWXQEd6DM16IA&s' },
  { label: 'Main-course', id: 'Main-course', imageUrl: 'https://assets.epicurious.com/photos/594062e96c15d005a3037963/1:1/w_320%2Cc_limit/LAMB-CHOPS-WITH-POLENTA-AND-GRILLED-SCALLION-SAUCE-hero-09062017.jpg' },
  { label: 'Side-dish', id: 'Side-dish', imageUrl: 'https://assets.epicurious.com/photos/5ad78633b24afe5122e72b5b/4:3/w_3108,h_2331,c_limit/blistered-asparagus-recipe-BA-041818.jpg' },
  { label: 'Dessert', id: 'Dessert', imageUrl: 'https://gobargingwp-s3.s3.eu-west-1.amazonaws.com/wp-content/uploads/2023/02/Classic-French-Macarons-2.jpg' },
]

const Categories = () => {
  const router = useRouter()

  const handleCategoryClick = (label: string) => {

    const params = new URLSearchParams()
    if (label !== 'All') {
      params.set('categories', label)
    }
    router.push(`/recipes/list${params.toString() ? '?' + params.toString() : ''}`)
  }

  return (
    <Grid gap="3" my="9" mx="4" columns={{ initial: '3', sm: '5', md: '9' }}>
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => handleCategoryClick(category.label)}
          className="cursor-pointer group flex items-center flex-col gap-2"
        >
          {/* Container Imagine  */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-transparent group-hover:border-brand-green transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:scale-110">
            <Avatar
              size="5"
              fallback="category"
              radius="full"
              src={category.imageUrl}
              style={{ width: '64px', height: '64px', objectFit: 'cover' }}
              className="transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
            />
          </div>

          <Text
            size="2"
            weight="bold"
            className="text-gray-500 group-hover:text-brand-green transition-colors duration-300 text-center"
          >
            {category.label}
          </Text>
        </div>
      ))}
    </Grid>
  )
}

export default Categories