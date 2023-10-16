import { Box } from "@chakra-ui/react";
import { Navigation } from "../components/navigation";
import { Main } from "../components/main";
function Home() {
  return (
    <Box>
      <Navigation />
      <Main />
    </Box>
  );
}

export default Home;
