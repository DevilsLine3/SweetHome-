import React from "react";
import { BrowserRouter  } from "react-router-dom";
import AppRoutes from "./routes/routes.jsx";
import { ThemeProvider } from "./components/thema.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppRoutes/>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;