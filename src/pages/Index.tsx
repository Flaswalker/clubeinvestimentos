
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // This ensures we're properly routing through the new structure
    navigate("/", { replace: true });
  }, [navigate]);
  
  return <LandingPage />;
};

export default Index;
