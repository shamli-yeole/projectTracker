import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import verifyToken from "./utils/verifyToken";
 
const PrivateRoute = ({ }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await verifyToken();
        setIsAuthenticated(response?.valid === true);
      } catch (error) {
        console.error("Token verification failed:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
 
    checkToken();
  }, []);
 
  if (loading) {
    return <div>Loading...</div>; // ✅ Show a loading message
  }
 
  return isAuthenticated ? <Outlet/> : <Navigate to="/sign-in" />;
};
 
export default PrivateRoute;