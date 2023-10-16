import { Box, Heading } from "@chakra-ui/react";

function Button() {
  return (
    <Box
      display="flex"
      background={"black"}
      padding={5}
      justifyContent={"center"}
      alignItems={"center"}
      borderRadius={10}
      cursor={"pointer"}
    >
      <Heading color="white">{`SUBMIT`}</Heading>
    </Box>
  );
}

export { Button };
