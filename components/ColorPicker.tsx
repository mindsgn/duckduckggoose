import { Box, Heading } from "@chakra-ui/react";
import { SketchPicker } from "react-color";

function ColorPicker() {
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
          <SketchPicker />
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
          <SketchPicker />
        </Box>
      </Box>
    </Box>
  );
}

export { ColorPicker };
