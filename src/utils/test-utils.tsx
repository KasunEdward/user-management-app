// src/utils/test-utils.tsx
import React, { ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider} from "../context/ThemeContext";
import { getDesignTokens } from "../utils/theme/config";
import store from "../services/store"; 
import { BrowserRouter } from "react-router-dom";
interface RenderWithProvidersOptions extends RenderOptions {
  mode?: "light" | "dark";
}

const renderWithProviders = (
  ui: React.ReactElement,
  { mode = "light", ...renderOptions }: RenderWithProvidersOptions = {}
) => {
  // Create a theme based on the mode
  const theme = createTheme(getDesignTokens(mode));

  const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <Provider store={store}>
      <ThemeProvider>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
          {children}
          </BrowserRouter>
        </MuiThemeProvider>
      </ThemeProvider>
    </Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";
export { renderWithProviders };
