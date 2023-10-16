import { Box, Heading, Button as ButtonContainer } from "@chakra-ui/react";

function Button() {
  return (
    <ButtonContainer
      display="flex"
      background={"black"}
      padding={5}
      justifyContent={"center"}
      alignItems={"center"}
      borderRadius={10}
      cursor={"pointer"}
    >
      <Heading color="white">{`SUBMIT`}</Heading>
    </ButtonContainer>
  );
}

export { Button };
