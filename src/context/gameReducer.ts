import { State } from "./GameReducer.types";
import { ACTIONTYPE } from "./GameReducer.types";

export function gameReducer(state: State, action: ACTIONTYPE): State {
    switch (action.type) {
        case "SET_GAME":
            return {
                ...state,
                questions: action.payload

            }
        default:
            return state;
    }
}