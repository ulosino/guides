import { GetStaticProps } from "next";

import Head from "next/head";
import Link from "next/link";

import {
  Heading,
  Text,
  Container,
  Flex,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiArrowNarrowLeft } from "react-icons/hi";

import EndNavigation from "components/EndNavigation";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>ULOSINO &mdash; 404</title>
      </Head>

      <Flex
        display="flex"
        minH="100vh"
        direction="column"
        bg={useColorModeValue("gray.50", "inherit")}
      >
        <Container maxWidth="container.lg" mb={12}>
          <nav>
            <Button leftIcon={<HiArrowNarrowLeft />} mt={8}>
              Back to Guides
            </Button>
          </nav>
        </Container>
        <Container maxW="container.sm" flex={1}>
          <Stack direction="column" spacing={8}>
            <Stack direction="column" spacing={2}>
              <Heading size="md">There is nothing to show at this URL.</Heading>
              <Text>
                If you typed the URL manually, check it for spelling mistakes.
                If there was once a page here, it was probably moved or deleted.
              </Text>
            </Stack>
            <Link href="/" passHref>
              <Button leftIcon={<HiArrowNarrowLeft />} size="lg">
                Back to Guides
              </Button>
            </Link>
          </Stack>
        </Container>
        <Container maxW="container.lg">
          <EndNavigation />
        </Container>
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
