// Featured guides, must be manually added

import Link from "next/link";

import {
  SimpleGrid,
  Stack,
  Heading,
  Text,
  Box,
  DarkMode,
} from "@chakra-ui/react";

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
    <Card bg="secondary" color="white">
      <DarkMode>
        <SimpleGrid minChildWidth="240px" spacing={10}>
          <Stack direction="column" spacing={2}>
            <Text textStyle="secondary" as="h6">
              Start
            </Text>
            <Link href="/guides/first" passHref>
              <Card variant="button">
                <Stack direction="column" spacing={2}>
                  <Heading size="md">Choosing your 1st</Heading>
                  <Text>
                    Make the first step and learn some opinionated tips and
                    tricks for choosing your first open source OS.
                  </Text>
                </Stack>
              </Card>
            </Link>
            <Link href="/guides/definitions" passHref>
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
            <Link href="/guides/virtual" passHref>
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
            <Link href="/guides/shell" passHref>
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
      </DarkMode>
    </Card>
  );
}
