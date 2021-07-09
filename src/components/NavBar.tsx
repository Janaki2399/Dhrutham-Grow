import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/auth-context";

export const NavBar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();

  const logout = () => {
    setToken(null);
    localStorage?.removeItem("login");
    navigate("/");
  };

  return (
    <div className="navbar flex justify-between align-middle">
      <div
        className="text-primary-color font-semibold text-xl"
        onClick={() => {
          navigate("/");
        }}
      >
        Dhrutham Grow
      </div>
      <div className="flex items-center">
        <div className="mr-3">
          {!token ? (
            <Link
              to="/login"
              className=" nav-item anchor-link bg-primary-color px-3 py-0.5 text-white"
            >
              Login
            </Link>
          ) : (
            <div className="nav-item cursor-pointer" onClick={logout}>
              <span className="material-icons-outlined">logout</span>
            </div>
          )}
        </div>
        <div>
          <Link to="/progress_list" className=" nav-item anchor-link">
            My Progress
          </Link>
        </div>
      </div>
    </div>
  );
};
