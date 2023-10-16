import { Box, Container, Input } from "@chakra-ui/react";
import { Button } from "./button";

function TextInput() {
  return (
    <Box marginBottom={10}>
      <Input
        placeholder="whats on your mind?"
        borderBottomWidth={4}
        borderBottomColor={"black"}
      />
    </Box>
  );
}

export { TextInput };
