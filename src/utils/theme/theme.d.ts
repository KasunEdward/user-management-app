// theme.d.ts
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    text: {
      primary: string;
      secondary: string;
    };
    background: {
      default: string;
      light: string;
    };
  }

  interface PaletteOptions {
    primary: PaletteColorOptions & {
      text: {
        primary: string;
        secondary: string;
      };
      background: {
        default: string;
        light: string;
      };
    };
  }
}
