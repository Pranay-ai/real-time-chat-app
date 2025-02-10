import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../apifetch/axiosConfig";

const EmailVerificationRoute = ({ children }) => {
  const [isEmailVerified, setIsEmailVerified] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/users/me"); // ✅ Fetch user authentication status
        setIsEmailVerified(response.data.data.isEmailVerified);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsEmailVerified(false); // Assume not verified if there's an error
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>; // ✅ Show loading while checking verification

  if (isEmailVerified) {
    return <Navigate to="/" replace />; // ✅ Redirect if email is already verified
  }

  return children;
};

export default EmailVerificationRoute;
