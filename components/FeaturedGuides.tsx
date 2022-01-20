// Featured guides, must be manually added

import Link from "next/link";

import { SimpleGrid, Stack, Heading, Text, Box } from "@chakra-ui/react";

import { useStyleConfig } from "@chakra-ui/react";
function Card(props) {
  const { variant, children, ...rest } = props;

  const styles = useStyleConfig("Card", { variant });

  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export default function FeaturedGuides() {
  return (
    <Card>
      <SimpleGrid minChildWidth="240px" spacing={10}>
        <Stack direction="column" spacing={2}>
          <Text textStyle="secondary" as="h6">
            Start
          </Text>
          <Link href="/guides/first">
            <Card variant="button">
              <Stack direction="column" spacing={2}>
                <Heading size="md">Choosing your 1st</Heading>
                <Text>
                  Make the first step and learn some opinionated tips and tricks
                  for choosing your first open source OS.
                </Text>
              </Stack>
            </Card>
          </Link>
          <Link href="/guides/definitions">
            <Card variant="button">
              <Stack direction="column" spacing={2}>
                <Heading size="md">Definitions</Heading>
                <Text>Learn basic lexicon.</Text>
              </Stack>
            </Card>
          </Link>
        </Stack>
        <Stack direction="column" spacing={2}>
          <Text textStyle="secondary" as="h6">
            Keep Learning
          </Text>
          <Link href="/guides/virtual">
            <Card variant="button">
              <Stack direction="column" spacing={2}>
                <Heading size="md">Virtual Machines</Heading>
                <Text>
                  Get another OS running along side Windows, macOS, or another
                  OS.
                </Text>
              </Stack>
            </Card>
          </Link>
        </Stack>
        <Stack direction="column" spacing={2}>
          <Text textStyle="secondary" as="h6">
            Become an Expert
          </Text>
          <Link href="/guides/shell">
            <Card variant="button">
              <Stack direction="column" spacing={2}>
                <Heading size="md">Shell &amp; Going Lighter</Heading>
                <Text>
                  Customise a lightweight Linux distribution and install
                  software.
                </Text>
              </Stack>
            </Card>
          </Link>
        </Stack>
      </SimpleGrid>
    </Card>
  );
}
