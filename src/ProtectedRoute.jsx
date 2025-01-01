import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role"); // Simpan role dari backend di localStorage

  useEffect(() => {
    if (!allowedRoles.includes(userRole)) {
      navigate("/unauthorized");
    }
  }, [allowedRoles, navigate, userRole]);

  return children;
}

export default ProtectedRoute;
