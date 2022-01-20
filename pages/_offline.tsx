import { GetStaticProps } from "next";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Heading,
  Text,
  Container,
  Flex,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiOutlineRefresh, HiArrowNarrowLeft } from "react-icons/hi";

import EndNavigation from "components/EndNavigation";

export default function Offline() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>ULOSINO &mdash; Offline</title>
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
              <Heading size="md">You're offline.</Heading>
              <Text>
                There were issues downloading data from the server. Check your
                data or networking settings and get back online.
              </Text>
            </Stack>
            <Stack direction="column" spacing={2}>
              <Button
                leftIcon={<HiOutlineRefresh />}
                size="lg"
                onClick={() => router.reload()}
              >
                Try Again
              </Button>
              <Link href="/" passHref>
                <Button leftIcon={<HiArrowNarrowLeft />} size="lg">
                  Back to Guides
                </Button>
              </Link>
            </Stack>
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
