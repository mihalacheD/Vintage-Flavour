'use client'
import { Avatar, Box, Flex, Grid, Text } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'


const categories: { label: string; id: string; imageUrl: string }[] = [
  {
    label: 'All',
    id: 'all',
    imageUrl: 'https://static1.squarespace.com/static/53b839afe4b07ea978436183/53bbeeb2e4b095b6a428a13e/5fd2570b51740e23cce97919/1725651374258/traditional-food-around-the-world-Travlinmad.jpg?format=1500w',
  },
  {
    label: 'Breakfast',
    id: 'Breakfast',
    imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2017/08/smoothie-bowl-3a8632c.jpg?quality=90&resize=556,505',
  },
  {
    label: 'Lunch',
    id: 'Lunch',
    imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/harissa-chicken-and-farro-salad-healthy-lunch-ideas-1671486565.jpg?crop=0.6672222222222222xw:1xh;center,top&resize=980:*',
  },
  {
    label: 'Dinner',
    id: 'Dinner',
    imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Fish-Tacos-1337495.jpg?quality=90&resize=556,505',
  },
  {
    label: 'Appetizer',
    id: 'Appetizer',
    imageUrl: 'https://www.southernliving.com/thmb/EEWdxrBorv5JJ-Xpcppjz8EsthU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Mini_Potato_Skins_005-2c0f3c0747254639a8f72ea37e1819fd.jpg',
  },
  {
    label: 'Salad',
    id: 'Salad',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkbmEdqPCaryXon_xcg7zD-gWXQEd6DM16IA&s',
  },
  {
    label: 'Main-course',
    id: 'Main-course',
    imageUrl: 'https://assets.epicurious.com/photos/594062e96c15d005a3037963/1:1/w_320%2Cc_limit/LAMB-CHOPS-WITH-POLENTA-AND-GRILLED-SCALLION-SAUCE-hero-09062017.jpg',
  },
  {
    label: 'Side-dish',
    id: 'Side-dish',
    imageUrl: 'https://assets.epicurious.com/photos/5ad78633b24afe5122e72b5b/4:3/w_3108,h_2331,c_limit/blistered-asparagus-recipe-BA-041818.jpg',
  },
  {
    label: 'Dessert',
    id: 'Dessert',
    imageUrl: 'https://gobargingwp-s3.s3.eu-west-1.amazonaws.com/wp-content/uploads/2023/02/Classic-French-Macarons-2.jpg',
  },
]

const Categories = () => {
  const router = useRouter()

  const handleCategoryClick = (category: { label: string }) => {
    const query = category.label === 'All' ? '' : `?categories=${category.label}`
    router.push('/recipes/list' + query)
  }

  return (
    <Grid gap="3" my="9" mx="4" columns={{ initial: '3', md: '9' }}>
      {categories.map((category) => (
        <Box
          key={category.id}
          style={{ border: 'none' }}
          onClick={() => handleCategoryClick(category)}
          className="cursor-pointer group"
        >
          <Flex gap="3" direction="column" align="center">
            <Avatar
              size="5"
              fallback="category"
              radius="full"
              src={category.imageUrl}
              // ADAUGĂ STILUL DE MAI JOS:
              style={{ width: '64px', height: '64px', objectFit: 'cover' }}
              className="transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
            />
            <Box>
              <Text
                as="div"
                size="2"
                weight="bold"
                color="gray"
                className="group-hover:green transition-colors duration-300"
              >
                {category.label}
              </Text>
            </Box>
          </Flex>
        </Box>
      ))}
    </Grid>
  )
}

export default Categories