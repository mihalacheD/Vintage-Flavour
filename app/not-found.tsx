import { Flex, Heading, Text, Button } from '@radix-ui/themes';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Flex direction="column" align="center" justify="center" gap="4" mt="9">
      <Heading size="8">404</Heading>
      <Text color="gray">Oops! This page is not found</Text>
      <Button variant="solid" color="orange" asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </Flex>
  );
}