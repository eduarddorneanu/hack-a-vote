import { extendTheme } from "@chakra-ui/react";

// Here you can add custom colors
const colors = {
  accent: "#2C2A6C",
};

const fonts = {
  heading: "Archivo, sans-serif",
  body: "Archivo, sans-serif",
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export default extendTheme({
  colors,
  fonts,
  config,
});
