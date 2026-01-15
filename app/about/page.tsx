'use client'
import { Container, Heading, Text, Flex, Grid, Box } from '@radix-ui/themes'
import { HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi'

const AboutContactPage = () => {
  return (
    <main className="min-h-screen pb-20">
      {/* Hero Section - About */}
      <section className="bg-linear-to-b from-emerald-50 to-white py-20 px-4">
        <Container size="3">
          <Flex direction="column" align="center" className="text-center">
            <Heading size="9" className="great-vibes-regular text-brand-orange-6">
              Our Culinary Story
            </Heading>
            <Text className="text-gray-600 max-w-2xl text-lg leading-relaxed">
              Vintage Flavour started with a simple mission: to preserve the soul of traditional cooking in a modern world. We believe every recipe is a time capsule of culture, family, and love.
            </Text>
          </Flex>
        </Container>
      </section>

      <Container size="4" className="px-4">

        {/* Left Column: Detailed About & Info */}
        <Flex direction="column" gap="6">
          <Box className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
            <Heading size="6" className="mb-4 text-gray-800">Who We Are</Heading>
            <Text as="p" className="text-gray-600 mb-4">
              We are a community of chefs, home cooks, and food enthusiasts dedicated to sharing authentic flavors. From the spice markets of Marrakech to the trattorias of Rome, we bring the world&apos;s kitchen to your home.
            </Text>

            <div className="space-y-4 mt-8">
              <Flex align="center" gap="4" className="text-gray-700">
                <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green">
                  <HiMail size={20} />
                </div>
                <Text size="2">hello@vintageflavour.com</Text>
              </Flex>
              <Flex align="center" gap="4" className="text-gray-700">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange">
                  <HiLocationMarker size={20} />
                </div>
                <Text size="2">Bucharest, Romania</Text>
              </Flex>
              <Flex align="center" gap="4" className="text-gray-700">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                  <HiPhone size={20} />
                </div>
                <Text size="2">+40 7xx xxx xxx</Text>
              </Flex>
            </div>
          </Box>

          {/* Visual element / Quote */}
          <Box className="bg-brand-green p-8 rounded-4xl text-white">
            <Text size="5" className="italic font-medium leading-tight">
              &quot;Cooking is like love. It should be entered into with abandonment or not at all.&quot;
            </Text>
          </Box>
        </Flex>

      </Container>
    </main>
  )
}

export default AboutContactPage