// About promotion and quick links

import Link from "next/link";

import { SimpleGrid, Stack, Button, Text, Box } from "@chakra-ui/react";
import { HiOutlineGlobe, HiOutlineCode } from "react-icons/hi";

export default function About() {
  return (
    <SimpleGrid minChildWidth="240px" spacing={10}>
      <Stack direction="column" spacing={2}>
        <Text textStyle="secondary" as="h6">
          About ULOSINO Guides
        </Text>
        <Text>
          ULOSINO Guides is the learning companion to ULOSINO, the modern
          setting for discovering open source operating systems. With Guides,
          you can learn Unix, Linux, and other computing concepts for free and
          without distractions. Then, make your moves and take your knowledge to
          The Friendly Flow over at ULOSINO.
        </Text>
      </Stack>
      <Stack direction="column" spacing={2}>
        <Text textStyle="secondary" as="h6">
          Links
        </Text>
        <Link href="https://www.ulosino.com">
          <Button leftIcon={<HiOutlineGlobe />}>Go to ULOSINO</Button>
        </Link>
        <Link href="https://github.com/ulosino/guides">
          <Button leftIcon={<HiOutlineCode />}>Make a Contribution</Button>
        </Link>
      </Stack>
    </SimpleGrid>
  );
}
