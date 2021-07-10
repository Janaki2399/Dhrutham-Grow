import { Loader } from "../../components/Loader";
import quiz from "../../assets/quiz.svg";
import { useNavigate } from "react-router";
import { InputErrorProps } from "./Login.types";
import { API_STATUS } from "../../constants";
import { useLogin } from "../../hooks/useLogin";

export type RouteState = {
  from: string;
};
export const Login = () => {
  const {
    handleSubmit,
    handleOnChange,
    handleOnBlur,
    getInputClassName,
    status,
    errors,
    errorMessage,
    shouldShowErrors,
    isBtnDisabled,
  } = useLogin();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-evenly h-screen md:flex-row md:flex bg-gray-50">
      <div className="md:w-2/5 md:visible">
        <img src={quiz} alt="img" />
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="max-w-6xl border p-7 shadow-lg bg-white"
          noValidate
        >
          <div className="text-2xl mb-3 text-center font-semibold">Login</div>

          <div className="flex-column margin-bottom">
            <label className="input-label">Email</label>
            <input
              type="email"
              className={getInputClassName("email")}
              onChange={handleOnChange("email")}
              onBlur={() => handleOnBlur("email")}
            />
            {shouldShowErrors("email") && (
              <InputError errorMessage={errors.email} />
            )}
          </div>

          <div className="flex-column">
            <label className="input-label">Password</label>
            <input
              type="password"
              className={getInputClassName("password")}
              onChange={handleOnChange("password")}
              onBlur={() => handleOnBlur("password")}
            />
            {shouldShowErrors("password") && (
              <InputError errorMessage={errors.password} />
            )}
          </div>

          <div>
            <button
              disabled={isBtnDisabled(errors)}
              className="bg-primary-color text-white p-1 w-full mt-5"
            >
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
        {status === API_STATUS.LOADING && (
          <div className="mt-5">
            <Loader />
          </div>
        )}
        {status === API_STATUS.ERROR && (
          <div className="mt-5 bg-red-100 px-4 py-1 text-primary-color font-semibold">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};
export const InputError = ({ errorMessage }: InputErrorProps) => {
  return (
    <div role="alert" className="error-text">
      {errorMessage}
    </div>
  );
};
