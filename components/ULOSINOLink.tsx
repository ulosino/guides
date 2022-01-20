// Warning to users who don't use JavaScript

import Link from "next/link";

import { Center } from "@chakra-ui/react";
import { IconLogo } from "components/Logo";

export default function ULOSINOLink() {
  return (
    <Link href="https://www.ulosino.com" passHref>
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
  );
}
