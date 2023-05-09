// this is needed to fix Chakra UI colorScheme bug, per: 
// https://stackoverflow.com/questions/70257721/how-to-fix-typeerror-cannot-read-properties-of-undefined-reading-usesystemco

// 1. Import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

// 2. Add color mode config (let's browser set light/dark mode based on user's time of day)
const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

// 3. Extend the theme to allow overriding of tokens in default Chakra-UI theme
const theme = extendTheme({ 
  config,
  fonts: {
    body: "sans-serif",
    heading: "serif",
    mono: "monospace"
  }
});

export default theme;