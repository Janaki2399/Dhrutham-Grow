import { State, ACTIONTYPE } from "./loginReducer.types";

export function loginReducer(state: State, action: ACTIONTYPE): State {
  switch (action.type) {
    case "HANDLE_INPUT_CHANGE":
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          [action.payload.field]: action.payload.value,
        },
      };

    case "HANDLE_ON_BLUR":
      return {
        ...state,
        touchedFields: {
          ...state.touchedFields,
          [action.payload.field]: true,
        },
      };

    case "SET_STATUS":
      return {
        ...state,
        status: action.payload.status,
      };

    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
