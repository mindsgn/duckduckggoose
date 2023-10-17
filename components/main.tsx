import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  useToast,
} from "@chakra-ui/react";
import { Button } from "./button";
import { TextInput } from "./textInput";
import io from "socket.io-client";
import { ColorPicker } from "./ColorPicker";
import { ImagePicker } from "./imagePicker";
import { SpeedPicker } from "./speedPicker";

function Main() {
  const toast = useToast();
  const [data, setData] = useState({
    text: "",
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
  });

  const [socket] = useState(
    io("https://mqtt.goodgoodgood.co.za", {
      transports: ["websocket"],
      ackTimeout: 10000,
      retries: 3,
    })
  );

  const submit = () => {
    try {
      const { text } = data;

      if (text.length === 0) {
        throw Error;
      }

      socket.emit("scroll", data);

      toast({
        title: "Sent",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error: any) {
      toast({
        title: "Failed.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    socket.on("update", (event) => {
      console.log("event: ", event);
    });
  }, []);

  return (
    <Box height={"100vh"} width="100vw" paddingTop={100}>
      <Container display="flex" flexDir={"column"}>
        <TextInput
          onChange={(text: string) => {
            setData({ ...data, text: text });
          }}
          value={data.text}
        />
        <Box marginBottom={10}>
          <Accordion>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Image
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <ImagePicker
                  onChange={(text: string) => {
                    setData({ ...data, text: data.text + text });
                  }}
                />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Color
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <ColorPicker
                  textColor={data.colorHex}
                  backgroundColor={data.backgroundHex}
                  onChangeText={(colorHex: any, color: any) => {
                    setData({ ...data, color, colorHex });
                  }}
                  onChangeBackground={(background: any, backgroundHex: any) => {
                    setData({ ...data, background, backgroundHex });
                  }}
                />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Speed
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <SpeedPicker
                  onChangeBanner={(event: number) => {
                    setData({ ...data, speed: event });
                  }}
                  onChangeWebsite={(event: number) => {
                    console.log(event);
                    setData({ ...data, websiteSpeed: event });
                  }}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>

        <Button onClick={() => submit()} />
      </Container>
    </Box>
  );
}

export { Main };
