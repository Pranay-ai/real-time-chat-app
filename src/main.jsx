import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import router from "./providers/RouterProvider.jsx";
import {RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeContext.jsx"
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./index.css";




createRoot(document.getElementById("root")).render(


    < Provider store={store}>
      <ThemeProvider>    
        <RouterProvider router={router} />
      </ThemeProvider>
      </Provider>

);
