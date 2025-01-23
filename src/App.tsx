import React, { useMemo } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, useThemeContext } from "./context/ThemeContext";
import MenuBar from "./components/MenuBar";
import AppRoutes from "./routes";
import { getDesignTokens } from "./utils/theme/config";

const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mode } = useThemeContext();

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppThemeProvider>
        {/* Your application components go here */}
        <AppRoutes/>
      </AppThemeProvider>
    </ThemeProvider>
  );
};

export default App;

