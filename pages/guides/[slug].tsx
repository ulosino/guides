import { GetStaticProps } from "next";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

import Head from "next/head";
import dynamic from "next/dynamic";

import { Stack, Heading, Button } from "@chakra-ui/react";
import { HiOutlineCode } from "react-icons/hi";

import UIProvider from "providers/UIProvider";

const DiscussionModal = dynamic(() => import("components/DiscussionModal"));

// Pages can use the following components if needed
const Link = dynamic(() => import("next/link"));
const Image = dynamic(() => import("next/image"));

const availableComponents = [Link, Image];

export default function MDXHostPage({ source, metadata, componentNames }) {
  const components = {
    ...availableComponents,
    Link: componentNames.includes("Link") ? Link : null,
    Image: componentNames.includes("Image") ? Image : null,
  };
  return (
    <UIProvider>
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
      <Stack direction="row" spacing={2} as="section">
        <DiscussionModal />
        {metadata.repository && (
          <Link href={metadata.repository} passHref>
            <Button leftIcon={<HiOutlineCode />}>Edit this Guide</Button>
          </Link>
        )}
      </Stack>
      <Stack spacing={2} mb={4}>
        <Heading size="3xl" as="h1">
          {metadata.title}
        </Heading>
      </Stack>
      <Stack direction={["column", "column", "row"]} spacing={10} as="main">
        <MDXRemote {...source} components={components} />
      </Stack>
    </UIProvider>
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
