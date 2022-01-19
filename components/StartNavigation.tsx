// Navigation at the top of the page

import Link from "next/link";
import { useRouter } from "next/router";

import {
  Stack,
  Flex,
  Spacer,
  Center,
  IconButton,
  Button,
  Box,
  Heading,
} from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";

import { IconLogo, SmallLogo } from "components/Logo";

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

// For desktop, includes links to Home and Browse pages, and access to <NavigationMenu>
export function StartNavigationDesktop() {
  return (
    <nav>
      <Flex>
        <Link href="/" passHref>
          <Card variant="button" p={2} mt={4}>
            <Stack direction="row" spacing={4}>
              <Box rounded="lg" bg="secondary" p={2}>
                <IconLogo />
              </Box>
              <Heading size="md" pt={2} pe={4}>
                ULOSINO Guides
              </Heading>
            </Stack>
          </Card>
        </Link>
        <Spacer />
        <Stack direction="row" pt={8}>
          <Link href="/" passHref>
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/browse" passHref>
            <Button variant="ghost">Browse</Button>
          </Link>
        </Stack>
      </Flex>
    </nav>
  );
}

// For mobile, only includes access to <NavigationMenu>
export function StartNavigationMobile() {
  const router = useRouter();
  return (
    <Flex>
      <IconButton
        aria-label="Go Back"
        title="Go Back"
        onClick={() => router.back()}
        icon={<FiChevronLeft />}
        size="lg"
        variant="ghost"
        mt={4}
      />
      <Spacer />
      <Link href="/" passHref>
        <Center
          cursor="pointer"
          id="testing-display-logoSm"
          bg="secondary"
          roundedBottom="2xl"
          p={4}
        >
          <SmallLogo />
        </Center>
      </Link>
    </Flex>
  );
}
