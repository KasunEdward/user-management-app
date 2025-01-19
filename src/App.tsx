import React from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, useThemeContext } from "./context/ThemeContext";
import UserTable from "./components/UserTable";
import MenuBar from "./components/MenuBar";
import Layout from "./layout";
import AppRoutes from "./routes";

const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { mode } = useThemeContext();

  const theme = createTheme({
    palette: {
      mode, // Dynamically sets light or dark mode
    },
  });

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
        <MenuBar />
        <AppRoutes/>
      </AppThemeProvider>
    </ThemeProvider>
  );
};

export default App;

