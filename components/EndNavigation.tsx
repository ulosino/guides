// Navigation/footer at the end of the page, only visible on Desktop

import Link from "next/link";

import { Flex, Spacer } from "@chakra-ui/react";

import LegalNavigation from "components/LegalNavigation";

export default function EndNavigation() {
  return (
    <Flex id="testing-display-footer" as="footer" pb={4}>
      <Spacer />
      <LegalNavigation />
    </Flex>
  );
}
