import { Box, Container, Input } from "@chakra-ui/react";
import { Button } from "./button";

function TextInput({ value, onChange }: { value: string; onChange: any }) {
  return (
    <Box marginBottom={10}>
      <Input
        placeholder="Whats on your mind?"
        borderBottomWidth={4}
        borderBottomColor={"black"}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
    </Box>
  );
}

export { TextInput };
