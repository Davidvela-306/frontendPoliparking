import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAllowed, redirectTo }) => {
  if (!isAllowed) return <Navigate to={redirectTo} replace />;

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
