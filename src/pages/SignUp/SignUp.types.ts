export type SignUpDetails = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type InputErrorProps = {
  errorMessage: string | undefined;
};
export type ErrorMessage = {
  success: boolean;
  errorMessage: string;
};

export type SignUpResponse = {
  token: string;
};

export type RouteState = {
  from: string;
};

export type Error = SignUpDetails;
export type ErrorPartial = Partial<Error>;
