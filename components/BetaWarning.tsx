// Warning that Guides is in beta
// To be removed if the product is successful and when more Guides are added

import { Stack, Icon, Text, Box } from "@chakra-ui/react";
import { HiExclamationCircle } from "react-icons/hi";

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

export default function BetaWarning() {
  return (
    <Card>
      <Stack direction="row" spacing={4}>
        <Icon as={HiExclamationCircle} w={8} h={8} />
        <Text pt={1}>Guides is in a pre-release phase.</Text>
      </Stack>
    </Card>
  );
}
