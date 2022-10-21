// this is needed to fix Chakra UI colorScheme bug, per: 
// https://stackoverflow.com/questions/70257721/how-to-fix-typeerror-cannot-read-properties-of-undefined-reading-usesystemco

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({ 
  config,
  fonts: {
    body: "sans-serif",
    heading: "serif",
    mono: "monospace"
  }
});

export default theme;