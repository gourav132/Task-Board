import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material";
import "./index.css";
import App from "./App.jsx";
import { DataContext } from "./Context/DataContext.jsx";

const theme = createTheme();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
