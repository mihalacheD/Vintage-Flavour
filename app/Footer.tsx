import { Section, Flex, Heading, Em, Link, Text } from '@radix-ui/themes'
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { ImPinterest2 } from "react-icons/im";
import { IoLogoTiktok } from "react-icons/io5";
import Register from './components/Register';




const Footer = () => {

  return (
    <Section 	style={{ backgroundColor: "rgba(121, 193, 65, 0.7)"}} my='9'>
      <Flex align='center' justify='center'  gap='9' direction={{ initial : "column", md: "row"}}>

        <Flex align='baseline' direction={{ initial : "column", md: "row"}}>
          <Heading size='9' className='great-vibes-regular' color='bronze' mx='5'>Follow <Em> us</Em></Heading>
            <Flex direction='row' gap='4'>
              <Link ml='3'><FaFacebookSquare size='2.5em' color='white'/></Link>
              <Link ml='3'><FaInstagram size='2.5em' color='white'/></Link>
              <Link ml='3'><ImPinterest2 size='2.5em' color='white'/></Link>
              <Link ml='3'><IoLogoTiktok size='2.5em' color='white'/></Link>
            </Flex>
          </Flex>
          <Register/>
      </Flex>
      <Flex align='end' justify='center' m='5'>
        <Text  align='center' size='4' color='brown'>© Mihalache Daniela 2025</Text>
      </Flex>
    </Section>
  )
}

export default Footer
