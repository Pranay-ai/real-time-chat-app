import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../apifetch/axiosConfig";
import { routes } from "../utilities/routes";

const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/users/me"); 
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>; 

  if (isAuthenticated) {
    return <Navigate to={routes.authroutes.home} replace />;
  }

  return children;
};

export default PublicRoute;
