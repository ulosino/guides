import { GetStaticProps } from "next";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import Head from "next/head";
import dynamic from "next/dynamic";

import {
  Container,
  Stack,
  Flex,
  Spacer,
  Center,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiOutlineCode, HiChevronLeft } from "react-icons/hi";

import { IconLogo } from "components/Logo";

import EndNavigation from "components/EndNavigation";

const DiscussionModal = dynamic(() => import("components/DiscussionModal"));

// Pages can use the following components if needed
const Link = dynamic(() => import("next/link"));
const Image = dynamic(() => import("next/image"));
const FSTable = dynamic(() => import("components/FSTable"));

const availableComponents = [Link, Image, FSTable];

export default function MDXHostPage({ source, metadata, componentNames }) {
  const components = {
    ...availableComponents,
    Link: componentNames.includes("Link") ? Link : null,
    Image: componentNames.includes("Image") ? Image : null,
    FSTable: componentNames.includes("FSTable") ? FSTable : null,
  };
  return (
    <>
      <Head>
        <title>
          ULOSINO &mdash; {metadata.title}: '{metadata.summary}'
        </title>
        <meta property="og:title" content="{metadata.title} on ULOSINO" />
        <meta
          property="description"
          content="'{metadata.summary}' &mdash; {metadata.title} on ULOSINO"
        />
        <meta
          property="og:description"
          content="'{metadata.summary}' &mdash; {metadata.title} on ULOSINO"
        />
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
              <Stack direction="row" spacing={4} mt={6}>
                <Link href="/" passHref>
                  <Button leftIcon={<HiChevronLeft />}>Back to Guides</Button>
                </Link>
                <DiscussionModal />
                {metadata.repository && (
                  <Link href={metadata.repository} passHref>
                    <Button leftIcon={<HiOutlineCode />}>Edit</Button>
                  </Link>
                )}
              </Stack>
              <Spacer />
              <Link href="/" passHref>
                <Center
                  cursor="pointer"
                  id="testing-display-logoLg"
                  bg="secondary"
                  roundedBottom="2xl"
                  p={4}
                >
                  <IconLogo />
                </Center>
              </Link>
            </Flex>
          </nav>
        </Container>
        <Container maxW="container.lg" flex={1}>
          <MDXRemote {...source} components={components} />
        </Container>
        <Container maxW="container.lg">
          <EndNavigation />
        </Container>
      </Flex>
    </>
  );
}

interface PathProps {
  params: {
    slug: string[];
  };
}

export const getStaticProps: GetStaticProps = async ({ params }: PathProps) => {
  const filePath = path.join(`public/content/guides`, `${params.slug}.mdx`);
  const source = fs.readFileSync(filePath);

  const { content, data } = matter(source);

  const componentNames = [
    /<Link/.test(content) ? "Link" : null,
    /<Image/.test(content) ? "Image" : null,
    /<FSTable/.test(content) ? "FSTable" : null,
  ].filter(Boolean);

  const mdxSource = await serialize(content, {
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      metadata: data,
      componentNames,
    },
  };
};

export const getStaticPaths = async () => {
  const pageDataPath = path.join(process.cwd(), "public/content/guides");

  const pageFilePaths = fs
    .readdirSync(pageDataPath)
    .filter((path) => /\.mdx?$/.test(path));

  const paths = pageFilePaths
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
