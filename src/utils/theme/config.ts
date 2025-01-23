export const getDesignTokens = (mode:"light"|"dark") => ({
    palette: {
      mode,
      ...(mode === "light" ? lightColors : darkColors),
    },
  });
  
  const lightColors = {
    primary: {
      main: "#3893d9",
      dark: "#3284c2",
      light: "#df5c8d",
      background: {
        default: "#fafafa",
        light: "rgba(255, 255, 255, 0.9)",
      },
      text: {
        primary: "rgb(25 118 210)",
        subtitleColor: "#777a7f",
        inputTextColor: "#b1b2b5",
        inputBorderColor: "#e0e0e0",
      },
      white: "#fff",
      black: "#000",
      borderColor: "#f4f4f4",
      shadowColor: "#b1b2b5",
      redColor: "#b40431",
      salmon: "#fc6f6e",
      commercialColor: "#8060d8",
    },
    shimmer: "linear-gradient(to right, #f6f6f6 8%, #f0f0f0 18%, #f6f6f6 33%)",
    error: {
      main: "#f44336",
    },
    info: {
      main: "#8060d8",
    },
    success: {
      main: "#2e7d32",
    },
  };
  
  const darkColors = {
    primary: {
      main: "#3893d9",
      dark: "#3284c2",
      light: "#df5c8d",
      background: {
        default: "#000",
        light: "rgba(18, 18, 18, 0.9)",
      },
      text: {
        primary: "#fff",
        dark: "#3e4246",
        subtitleColor: "#777a7f",
        inputTextColor: "#b1b2b5",
        inputBorderColor: "#e0e0e0",
      },
      white: "#121212",
      black: "#fff",
      borderColor: "#000",
      shadowColor: "#b1b2b5",
      redColor: "#b40431",
      salmon: "#fc6f6e",
      commercialColor: "#df5c8d",
    },
    shimmer: "linear-gradient(to right, #333333 8%, #2d2d2d 18%, #333333 33%)",
    error: {
      main: "#f44336",
    },
    info: {
      main: "#df5c8d",
    },
    success: {
      main: "#2e7d32",
    },
  };
  
  export const FontSize = {
    headingFontSize: "32px",
    subTitleFontSize: "16px",
    compactFontSize: "18px",
    tagFontSize: "12px",
    bodyFontSize: "14px",
    buttonFontSize: "14px",
  };
  