// Legal navigation at the end of the page

import Link from "next/link";
import { Flex, Spacer, Stack, Text } from "@chakra-ui/react";

export default function EndNavigation() {
  return (
    <Flex id="testing-display-footer" as="footer" mt={8} mb={4}>
      <Spacer />
      <Stack direction="row" spacing={2}>
        <Text fontSize="xs">
          <Link href="/licence">Copyright Notice</Link>
        </Text>
        <Text fontSize="xs">
          <Link href="https://www.ulosino.com/privacy">Privacy</Link>
        </Text>
      </Stack>
    </Flex>
  );
}
