import { API_STATUS } from "../../constants";
import { LoginDetails } from "../../pages/Login/Login.types";

export type State = {
  userDetails: LoginDetails;
  touchedFields: Partial<LoginDetails>;
  status: API_STATUS;
  errorMessage: string;
};

export type ACTIONTYPE =
  | {
      type: "HANDLE_INPUT_CHANGE";
      payload: { field: keyof LoginDetails; value: string };
    }
  | { type: "HANDLE_ON_BLUR"; payload: { field: keyof LoginDetails } }
  | { type: "SET_STATUS"; payload: { status: API_STATUS } }
  | { type: "SET_ERROR_MESSAGE"; payload: { errorMessage: string } };
