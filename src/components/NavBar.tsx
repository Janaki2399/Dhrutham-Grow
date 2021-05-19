import { Navigate, useNavigate } from "react-router";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="py-3 px-3 fixed top-0 md:border-solid md:border-red-800 w-full border-b-2 cursor-pointer">
      <div
        className="text-primary-color font-bold text-xl"
        onClick={() => {
          navigate("/");
        }}
      >
        Dhrutham Grow
      </div>
    </div>
  );
};
