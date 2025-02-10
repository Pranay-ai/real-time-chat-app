import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../apifetch/axiosConfig";
import { routes } from "../utilities/routes";
const RouteProtection = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/users/me"); // ✅ Fetch user from backend
        console.log("Response From Backend",response)
        setIsAuthenticated(true);
        setIsEmailVerified(response.data.data.emailVerified);
        setUserId(response.data.data.id);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>; // ✅ Show loading indicator while checking

  if (!isAuthenticated) {
    return <Navigate to={routes.authroutes.login} replace />; // ✅ Redirect if not logged in
  }

  if (isAuthenticated && !isEmailVerified) {
    return <Navigate to={`${routes.authroutes.verifyemail}/${userId}`} replace />; // ✅ Redirect if email not verified
  }

  return children;
};

export default RouteProtection;
