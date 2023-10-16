import { useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import { Button } from "./button";
import { TextInput } from "./textInput";
import io from "socket.io-client";
import { ColorPicker } from "./ColorPicker";
import { ImagePicker } from "./imagePicker";

const socket = io("https://mqtt.goodgoodgood.co.za", {
  transports: ["websocket"],
});

function Main() {
  const [data, setData] = useState({
    text: "",
    click: false,
    isScrolling: false,
    speed: 1,
    websiteSpeed: 1,
    color: {
      r: "241",
      g: "112",
      b: "19",
      a: "1",
    },
    colorHex: "#000000",
    background: {
      r: "244",
      g: "230",
      b: "230",
      a: "1",
    },
    backgroundHex: "#ffffff",
    isReady: false,
    isAuth: false,
    isDisabled: true,
  });

  const submit = () => {
    try {
    } catch (error: any) {}
  };

  return (
    <Box height={"100vh"} width="100vw" paddingTop={100}>
      <Container display="flex" flexDir={"column"}>
        <TextInput />
        <ImagePicker />
        <ColorPicker />
        <Button />
      </Container>
    </Box>
  );
}

export { Main };
