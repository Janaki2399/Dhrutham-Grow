import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/auth-context";
import { ErrorPartial } from "./SignUp.types";

export function SignUp() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<ErrorPartial>({});
  const navigate = useNavigate();
  const { signUp } = useAuth();

  function handleSignUp(e: { preventDefault: () => void }) {
    e.preventDefault();
    // console.log("helo");
    const validationError = validateSignUp(
      firstName,
      lastName,
      email,
      password
    );
    if (Object.keys(validationError).length > 0) {
      return setErrors(validationError);
    }
    signUp({ firstName, lastName, email, password });
  }

  function validateSignUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    let error: ErrorPartial = {};
    if (firstName.length === 0) {
      error.firstName = "First Name cannot be empty";
    }
    if (lastName.length === 0) {
      error.lastName = "First Name cannot be empty";
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      error.email = "Enter a valid email address";
    }
    if (password.length < 6) {
      error.password = "Password must be atleast 6 characters";
    }
    return error;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSignUp}
        className="max-w-2xl border p-7 shadow-lg"
        // style={{ width: "90%", maxWidth: "20rem" }}
        noValidate
      >
        <div className="text-xl mb-3 text-center font-semibold">Sign Up</div>
        <div>
          <label className="input-label">First Name</label>
          <input
            type="text"
            className={
              errors.firstName ? "error-input-box" : "generic-input-box"
            }
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            // onBlur={()=>validateSignUp("firstName")}
          />
          {errors.firstName && (
            <span className="error-text">{errors.firstName}</span>
          )}
        </div>

        <div>
          <label className="input-label">Last Name</label>
          <input
            type="text"
            className={
              errors.lastName ? "error-input-box" : "generic-input-box"
            }
            // required
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            // onBlur={()=>validateSignUp("lastName")}
          />
          {errors.lastName && (
            <span role="alert" className="error-text">
              {errors.lastName}
            </span>
          )}
        </div>
        <div>
          <label className="input-label">Email</label>
          <input
            type="email"
            className={
              errors.lastName ? "error-input-box" : "generic-input-box"
            }
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {errors.email && (
            <span role="alert" className="error-text">
              {errors.email}
            </span>
          )}
        </div>
        <div>
          <label className="input-label">Password</label>
          <input
            type="password"
            className={
              errors.lastName ? "error-input-box" : "generic-input-box"
            }
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {errors.password && (
            <span role="alert" className="error-text">
              {errors.password}
            </span>
          )}
        </div>
        <div>
          <button
            className="bg-primary-color text-white p-1 w-full mt-5"
            type="submit"
            // onClick={() => validateLogin(email, password, state)}
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
    </div>
  );
}
