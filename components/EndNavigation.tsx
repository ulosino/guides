// Navigation/footer at the end of the page, only visible on Desktop

import Link from "next/link";

import { Flex, Spacer, Center, Button } from "@chakra-ui/react";

import LegalNavigation from "components/LegalNavigation";
import { IconLogo } from "components/Logo";

export default function EndNavigation() {
  return (
    <Flex id="testing-display-footer" as="footer">
      <Link href="/copyright" passHref>
        <Button leftIcon={<IconLogo />} size="lg">
          Go to ULOSINO
        </Button>
      </Link>
      <Spacer />
      <Center>
        <LegalNavigation />
      </Center>
    </Flex>
  );
}
