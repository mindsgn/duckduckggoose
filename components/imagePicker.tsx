import { Box } from "@chakra-ui/react";
import { ImageButton } from "../constants";

function ImagePicker({ onChange }: { onChange: any }) {
  return (
    <Box display="flex" flexWrap={"wrap"}>
      {ImageButton.map((item) => {
        return (
          <Box
            zIndex={item.image}
            cursor={"pointer"}
            width={item.width}
            height="50px"
            background="black"
            backgroundImage={`url("${item.image}")`}
            backgroundSize={"contain"}
            backgroundRepeat={"no-repeat"}
            margin={2}
            onClick={() => {
              onChange(item.input);
            }}
          />
        );
      })}
    </Box>
  );
}

export { ImagePicker };
