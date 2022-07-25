import { Loader } from "../../components/Loader";
import quiz from "../../assets/quiz.svg";
import { useNavigate } from "react-router";
import { InputErrorProps } from "./SignUp.types";
import { API_STATUS } from "../../constants";
import { useSignup } from "../../hooks/useSignup";

export function SignUp() {
  const {
    handleSignUp,
    handleOnChange,
    handleOnBlur,
    errors,
    shouldShowErrors,
    getInputClassName,
    status,
    isBtnDisabled,
    errorMessage,
  } = useSignup();

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-evenly h-screen md:flex-row md:flex bg-gray-50">
      <div className=" md:w-2/5 md:visible">
        <img src={quiz} alt="img" />
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        <form
          onSubmit={handleSignUp}
          className="max-w-2xl border p-7 shadow-lg"
          noValidate
        >
          <div className="text-xl mb-3 text-center font-semibold">Sign Up</div>
          <div>
            <label className="input-label">First Name</label>
            <input
              type="text"
              className={getInputClassName("firstName")}
              onChange={handleOnChange("firstName")}
              onBlur={() => handleOnBlur("firstName")}
            />
            {shouldShowErrors("firstName") && (
              <InputError errorMessage={errors.firstName} />
            )}
          </div>

          <div>
            <label className="input-label">Last Name</label>
            <input
              type="text"
              className={getInputClassName("lastName")}
              onChange={handleOnChange("lastName")}
              onBlur={() => handleOnBlur("lastName")}
            />
            {shouldShowErrors("lastName") && (
              <InputError errorMessage={errors.lastName} />
            )}
          </div>

          <div>
            <label className="input-label">Email</label>
            <input
              type="email"
              className={getInputClassName("email")}
              required
              onChange={handleOnChange("email")}
              onBlur={() => handleOnBlur("email")}
            />
            {shouldShowErrors("email") && (
              <InputError errorMessage={errors.email} />
            )}
          </div>

          <div>
            <label className="input-label">Password</label>
            <input
              type="password"
              className={getInputClassName("password")}
              required
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
              type="submit"
            >
              SIGN UP
            </button>
          </div>

          <div className="mt-3 text-center text-md">
            Already have an account?
            <span
              className="text-primary-color font-bold cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </form>
        {status === API_STATUS.LOADING && (
          <div className="mt-5">
            <Loader />
          </div>
        )}
        {status === API_STATUS.ERROR && (
          <div className="mt-5 bg-red-200 px-4 py-1 text-primary-color font-semibold">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export const InputError = ({ errorMessage }: InputErrorProps) => {
  return (
    <div role="alert" className="error-text">
      {errorMessage}
    </div>
  );
};
