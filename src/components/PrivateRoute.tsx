import { useAuth } from "../context/Auth/auth-context";
import { Route, useLocation } from "react-router";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  path: string;
  element: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};
export function PrivateRoute({ path, element }: PrivateRouteProps) {
  const location = useLocation();
  const { token } = useAuth();
  return token ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate state={{ from: location.pathname }} replace to="/login" />
  );
}
