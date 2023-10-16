import { Box } from "@chakra-ui/react";
import { ImageButton } from "../constants";

function ImagePicker() {
  return (
    <Box display="flex">
      {ImageButton.map((item) => {
        return (
          <Box
            cursor={"pointer"}
            width="100px"
            height="100px"
            background="black"
            backgroundImage={`url("${item.image}")`}
            backgroundSize={"cover"}
            margin={2}
          />
        );
      })}
    </Box>
  );
}

export { ImagePicker };
