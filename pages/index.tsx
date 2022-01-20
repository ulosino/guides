import { GetStaticProps } from "next";

import Head from "next/head";
import Link from "next/link";

import { getNewestGuides, getGuides } from "providers/GuidesProvider";

import {
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

import dynamic from "next/dynamic";
const AutoComplete = dynamic(() =>
  import("@choc-ui/chakra-autocomplete").then((mod) => mod.AutoComplete)
);

import {
  Heading,
  Text,
  Box,
  Stack,
  Flex,
  Spacer,
  Container,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  FormControl,
  useColorModeValue,
} from "@chakra-ui/react";

import Loading from "components/Loading";
const FeaturedGuides = dynamic(() => import("components/FeaturedGuides"), {
  loading: () => <Loading />,
});
const About = dynamic(() => import("components/About"), {
  loading: () => <Loading />,
});
const EndNavigation = dynamic(() => import("components/EndNavigation"), {
  loading: () => <Loading />,
});
const ULOSINOLink = dynamic(() => import("components/ULOSINOLink"), {
  loading: () => <Loading />,
});

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

export default function Home({
  newestGuidesData,
  AZGuidesData,
}: {
  newestGuidesData: {
    date: string;
    id: string;
    title: string;
    description: string;
  }[];
  AZGuidesData: {
    date: string;
    id: string;
    title: string;
    description: string;
  }[];
}) {
  return (
    <>
      <Head>
        <title>
          ULOSINO Guides &mdash; Learn Unix, Linux, and operating system
          computing concepts for free
        </title>
      </Head>

      <Flex
        display="flex"
        minH="100vh"
        direction="column"
        bg={useColorModeValue("gray.50", "inherit")}
      >
        <Container maxWidth="container.lg" mb={12}>
          <nav>
            <Flex>
              <Heading size="md" mt={8}>
                ULOSINO Guides
              </Heading>
              <Spacer />
              <ULOSINOLink />
            </Flex>
          </nav>
        </Container>
        <Container maxW="container.lg" flex={1}>
          <Stack direction="column" spacing={10}>
            <FeaturedGuides />
            <Stack direction="column" spacing={2}>
              <Text textStyle="secondary" as="h6">
                All Guides
              </Text>
              <Tabs isLazy>
                <TabList id="testing-display-tabList">
                  <Stack direction="row" spacing={4} w="full">
                    <Tab shadow="inner">Alphabetical</Tab>
                    <Tab shadow="inner">Newest</Tab>
                    <Tab shadow="inner">Search</Tab>
                  </Stack>
                </TabList>
                <TabPanels>
                  <TabPanel px={0} pb={0} pt={4}>
                    <Stack direction="column" spacing={2}>
                      {AZGuidesData.map(({ id, title, description }) => (
                        <Link
                          href={`/guides/${id}`}
                          passHref
                          key={`/guides/${id}`}
                        >
                          <Card key={id} variant="button" px={6}>
                            <Stack direction="column" spacing={0}>
                              <Heading size="md">{title}</Heading>
                              {description && <Text>"{description}"</Text>}
                            </Stack>
                          </Card>
                        </Link>
                      ))}
                    </Stack>
                  </TabPanel>
                  <TabPanel px={0} pb={0} pt={4}>
                    <Stack direction="column" spacing={2}>
                      {newestGuidesData.map(({ id, title, description }) => (
                        <Link
                          href={`/guides/${id}`}
                          passHref
                          key={`/guides/${id}`}
                        >
                          <Card key={id} variant="button" px={6}>
                            <Stack direction="column" spacing={0}>
                              <Heading size="md">{title}</Heading>
                              {description && <Text>"{description}"</Text>}
                            </Stack>
                          </Card>
                        </Link>
                      ))}
                    </Stack>
                  </TabPanel>
                  <TabPanel px={0} pb={0} pt={4}>
                    <FormControl>
                      <AutoComplete>
                        <AutoCompleteInput
                          variant="outline"
                          size="md"
                          borderRadius="xl"
                          shadow="inner"
                          placeholder="Find a Guide..."
                          id="testing-db-input"
                        />
                        <AutoCompleteList>
                          {AZGuidesData.map(({ id, title }) => (
                            <AutoCompleteItem
                              key={`option-${title}`}
                              value={title}
                              maxSuggestions={5}
                              mx={3}
                              id="testing-db-item"
                            >
                              <Link
                                href={`/guides/${id}`}
                                passHref
                                key={`/guides/${id}`}
                              >
                                <Heading size="md" p={2}>
                                  {title}
                                </Heading>
                              </Link>
                            </AutoCompleteItem>
                          ))}
                        </AutoCompleteList>
                      </AutoComplete>
                    </FormControl>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Stack>
            <About />
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
  const newestGuidesData = getNewestGuides();
  const AZGuidesData = getGuides();
  return {
    props: {
      newestGuidesData,
      AZGuidesData,
    },
  };
};
