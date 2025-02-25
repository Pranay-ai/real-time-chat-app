import { createRoot } from "react-dom/client";
import router from "./providers/RouterProvider.jsx";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeContext.jsx";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store/store.js";
import "./index.css";

import { SocketProvider } from "./providers/SocketProvider"; // <-- Import your SocketProvider

createRoot(document.getElementById("root")).render(
  <ReduxProvider store={store}>
    <ThemeProvider>
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </ThemeProvider>
  </ReduxProvider>
);
