import { useNavigate } from "react-router";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div
        className="text-primary-color font-semibold text-xl"
        onClick={() => {
          navigate("/");
        }}
      >
        Dhrutham Grow
      </div>
    </div>
  );
};
