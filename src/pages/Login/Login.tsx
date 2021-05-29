import { useAuth } from "../../context/Auth/auth-context";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
export type RouteState = {
  from: string;
};
export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as RouteState;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(email, password, state);
        }}
        className="max-w-2xl border p-7 shadow-lg"
      >
        <div className="text-xl mb-3 text-center font-semibold">Login</div>
        <div className="flex-column">
          <label className="input-label">Email</label>
          <input
            type="email"
            className="generic-input-box"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex-column">
          <label className="input-label">Password</label>
          <input
            type="password"
            className="generic-input-box"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <button className="bg-primary-color text-white p-1 w-full mt-5">
            LOGIN
          </button>
        </div>
        <div className="mt-3 text-center text-md">
          Don't have an account?
          <span
            className="text-primary-color font-bold cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </div>
      </form>
    </div>
  );
};
