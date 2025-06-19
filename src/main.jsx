import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    darkBlue: "hsl(223, 30%, 9%)",
    semiDarkBlue: "hsl(223, 36%, 14%)",
    greyishBlue: "hsl(223, 23%, 46%)",
  },
  styles: {
    global: ({ colorMode }) => ({
      body: {
        bg: colorMode === "dark" ? "hsl(223, 30%, 9%)" : "white",
        fontFamily: "Outfit, sans-serif",
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme} resetCSS>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </ChakraProvider>
);
