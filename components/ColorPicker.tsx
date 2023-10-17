import { Box, Heading } from "@chakra-ui/react";
import { SketchPicker } from "react-color";

function ColorPicker({
  textColor,
  backgroundColor,
  onChangeText,
  onChangeBackground,
}: {
  textColor: string;
  backgroundColor: string;
  onChangeText: any;
  onChangeBackground: any;
}) {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      flexWrap={"wrap"}
      justifyContent={"space-between"}
      margin={10}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box margin={2}>
          <Heading size="md">Text Color</Heading>
        </Box>
        <Box>
          <SketchPicker
            color={textColor}
            onChange={(event) => {
              const { hex, rgb } = event;
              onChangeText(hex, rgb);
            }}
          />
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box margin={2}>
          <Heading size="md">Background Color</Heading>
        </Box>
        <Box>
          <SketchPicker
            color={backgroundColor}
            onChange={(event) => {
              const { hex, rgb } = event;
              onChangeBackground(hex, rgb);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export { ColorPicker };
