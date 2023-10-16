import { Title } from "./title";
import { Box } from "@chakra-ui/react";

function Navigation() {
  return (
    <Box
      display="flex"
      alignItems={"center"}
      position="fixed"
      top={0}
      width="100%"
      height="70px"
      background="white"
      paddingLeft="20px"
      align-items="center"
      zIndex={100}
      boxShadow={"0px 5px 5px rgba(0, 0, 0, 0.2)"}
    >
      <Title text={"GOOD GOOD GOOD BANNER"} />
    </Box>
  );
}

export { Navigation };
