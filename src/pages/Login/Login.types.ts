export type LoginDetails = {
  email: string;
  password: string;
};
export type Error = {
  email: string;
  password: string;
};
export type InputErrorProps = {
  errorMessage: string | undefined;
};

export type LoginResponse = {
  token: string;
};

export type ErrorMessage = {
  success: boolean;
  errorMessage: string;
};

export type ErrorPartial = Partial<Error>;
