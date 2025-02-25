// router.jsx
import { createBrowserRouter } from "react-router-dom";
import ProtectedLayout from "../components/ProtectedLayout.jsx";
import PublicLayout from "../components/PublicLayout.jsx"; // optional if needed
import Signup from "../pages/Signup.jsx";
import SignIn from "../pages/Signin.jsx";
import VerifyPage from "../pages/Verify.jsx";
import RouteProtection from "./RouteProtection.jsx";
import EmailVerificationRoute from "./EmailVerificationRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import HomePage from "../pages/HomePage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import UserPage from "../pages/UserPage.jsx";

const router = createBrowserRouter([
  {
    // Protected routes layout
    path: "/",
    element: (
      <RouteProtection>
        <ProtectedLayout />
      </RouteProtection>
    ),
    children: [
      { 
        path: "/", 
        element: <HomePage />
      },
      {
        path: "/profile-page",
        element: <ProfilePage />
      },
      {
        path:"/user-profile/:id",
        element: <UserPage />
      }
    ],
  },
  {
    // Public routes layout (you can create a PublicLayout if needed)
    path: "/",
    element: <PublicLayout />,
    children: [
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
        path: "/reset-password/:resetToken",
        element: (
          <PublicRoute>
            <ResetPassword />
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
      },
      {
        path: "/forgot-password",
        element: (
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        )
      }
    ],
  },
]);

export default router;
