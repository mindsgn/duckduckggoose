import { Box, Container, Input } from "@chakra-ui/react";
import { Button } from "./button";
import { TextInput } from "./textInput";
import io from "socket.io-client";
import { SketchPicker } from "react-color";
import { ColorPicker } from "./ColorPicker";

const socket = io("https://mqtt.goodgoodgood.co.za", {
  transports: ["websocket"],
});

function Main() {
  return (
    <Box display="flex" height={"100vh"} width="100vw" paddingTop={100}>
      <Container>
        <TextInput />
        <ColorPicker />
        <Button />
      </Container>
    </Box>
  );
}

export { Main };
