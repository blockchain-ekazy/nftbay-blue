import React from "react";
import Routers from "./routes";
import "./App.css";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routers />
    </ThemeProvider>
  );
}
export default App;
