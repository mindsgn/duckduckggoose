import { Heading } from "@chakra-ui/react";

function Title({ text }: { text: string }) {
  return <Heading size="md">{text}</Heading>;
}

export { Title };
