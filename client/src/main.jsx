import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserContextProvider from "./Context/UserContextProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import StoreContexProvider from "./Context/StoreContexProvider.jsx";
import {NextUIProvider} from '@nextui-org/react'
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <StoreContexProvider>
          <NextUIProvider>
            <App />
          </NextUIProvider>
        </StoreContexProvider>
      </BrowserRouter>
    </UserContextProvider>
  </StrictMode>
);
