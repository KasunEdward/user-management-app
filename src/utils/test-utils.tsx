// src/utils/test-utils.tsx
import React, { ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "../context/ThemeContext";
import { getDesignTokens } from "../utils/theme/config";
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from "react-router-dom";
import rootSaga from "../services/rootSaga";
import userSlice from '../services/slices/userSlice';
import statsSlice from '../services/slices/statsSlice';
import { RootState } from "../services/store";

// Function to create a store with optional preloadedState
const createTestStore = (preloadedState?: RootState) => {
  const sagaMiddleware = createSagaMiddleware();

  const testStore = configureStore({
    reducer: {
      users: userSlice,
      stats: statsSlice,
    },
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
    preloadedState,
  });

  sagaMiddleware.run(rootSaga); // Run the root saga in test store

  return testStore;
};

interface RenderWithProvidersOptions extends RenderOptions {
  mode?: "light" | "dark";
  preloadedState?: any; // Add preloadedState here
}

const renderWithProviders = (
  ui: React.ReactElement,
  { mode = "light", preloadedState, ...renderOptions }: RenderWithProvidersOptions = {}
) => {
  // Create a theme based on the mode
  const theme = createTheme(getDesignTokens(mode));

  // Create a store with preloadedState if provided
  const testStore = createTestStore(preloadedState);

  const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <Provider store={testStore}>
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
