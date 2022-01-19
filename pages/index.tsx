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
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  FormControl,
} from "@chakra-ui/react";
import { HiOutlineDatabase } from "react-icons/hi";

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

import UIProvider from "providers/UIProvider";

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
    <UIProvider>
      <Head>
        <title>ULOSINO &mdash; Browse</title>
      </Head>

      <Flex direction={["column", "column", "row"]} mb={8}>
        <Heading size="3xl">Browse</Heading>
        <Spacer />
        <Stack direction={["column", "column", "row"]} spacing={4} pt={4}>
          <Link href="/" passHref>
            <Button leftIcon={<HiOutlineDatabase />} size="sm" isActive>
              Search &amp; List
            </Button>
          </Link>
        </Stack>
      </Flex>

      <Stack direction="column" spacing={10}>
        <Stack direction="column" spacing={2}>
          <Text textStyle="secondary" as="h6">
            Make a Search
          </Text>
          <Card>
            <Tabs>
              <TabList>
                <Stack
                  direction={["column", "column", "row"]}
                  spacing={4}
                  w="full"
                >
                  <Tab shadow="inner">Search by Name</Tab>
                </Stack>
              </TabList>
              <TabPanels>
                {/* Search by name */}
                <TabPanel px={0} pb={0} pt={4}>
                  <FormControl>
                    <AutoComplete>
                      <AutoCompleteInput
                        variant="outline"
                        size="md"
                        borderRadius="xl"
                        shadow="inner"
                        placeholder="Find an operating system..."
                        id="testing-db-input"
                      />
                      <AutoCompleteList>
                        {AZGuidesData.map(({ id, title, description }) => (
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
                              <Box p={2} mb={2}>
                                <Flex direction="row" spacing={4}>
                                  <Heading size="md">{title}</Heading>
                                  <Spacer />
                                  {description && <Text>{description}</Text>}
                                </Flex>
                              </Box>
                            </Link>
                          </AutoCompleteItem>
                        ))}
                      </AutoCompleteList>
                    </AutoComplete>
                  </FormControl>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Card>
        </Stack>
        <Stack direction="column" spacing={2}>
          <Text textStyle="secondary" as="h6">
            All Operating Systems
          </Text>
          <Tabs isLazy>
            <TabList id="testing-display-tabList">
              <Stack direction="row" spacing={4} w="full">
                <Tab shadow="inner">Alphabetical</Tab>
                <Tab shadow="inner">Newest</Tab>
              </Stack>
            </TabList>
            <TabPanels>
              <TabPanel px={0} pb={0} pt={4}>
                <Stack direction="column" spacing={2}>
                  {AZGuidesData.map(({ id, title, description }) => (
                    <Link href={`/guides/${id}`} passHref key={`/guides/${id}`}>
                      <Card key={id} variant="button" px={6}>
                        <Flex direction="row" spacing={4}>
                          <Heading size="md">{title}</Heading>
                          <Spacer />
                          {description && <Text>{description}</Text>}
                        </Flex>
                      </Card>
                    </Link>
                  ))}
                </Stack>
              </TabPanel>
              <TabPanel px={0} pb={0} pt={4}>
                <Stack direction="column" spacing={2}>
                  {newestGuidesData.map(({ id, title, description }) => (
                    <Link href={`/guides/${id}`} passHref key={`/guides/${id}`}>
                      <Card key={id} variant="button" px={6}>
                        <Flex direction="row" spacing={4}>
                          <Heading size="md">{title}</Heading>
                          <Spacer />
                          {description && <Text>{description}</Text>}
                        </Flex>
                      </Card>
                    </Link>
                  ))}
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </UIProvider>
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
