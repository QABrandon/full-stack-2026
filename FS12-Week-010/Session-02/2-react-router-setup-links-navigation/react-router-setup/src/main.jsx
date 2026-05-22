import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// We have different routers for app types
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Sometimes you will see the Router declared in your main app */}
    {/* <BrowserRouter> */}
      <App />
    {/* </BrowserRouter> */}
  </StrictMode>
);
