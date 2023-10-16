import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "white",
        color: "black",
      },
      input: {
        "::placeholder": {
          color: "black",
        },
        fontWeight: "bold",
      },
    },
  },
});

export { theme };
