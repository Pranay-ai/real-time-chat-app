import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import App from "../App.jsx";
import Signup from "../pages/Signup.jsx";
import SignIn from "../pages/Signin.jsx";
import VerifyPage from "../pages/Verify.jsx";

import RouteProtection from "./RouteProtection.jsx";
import EmailVerificationRoute from "./EmailVerificationRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { 
        path: "/", 
        element: (
          <RouteProtection>
            <App />
          </RouteProtection>

        ) 
      },
      { 
        path: "/sign-in", 
        element: (
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        ) 
      },
      { 
        path: "/sign-up", 
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        ) 
      },
      { 
        path: "/verify-email/:id", 
        element: (
          <EmailVerificationRoute>
            <VerifyPage />
          </EmailVerificationRoute>
        ) 
      }
    ],
  },
]);

export default router;
