import { getUserData } from "./auth-reducer.ts";
import { AppDispatch, InferActionTypes } from "./redux.store.ts";

let initialState = {
    initialized: false

};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case "network/app/INITIALIZING_SUCCESSED":
            return {
                ...state, initialized: true
            }
        default:
            return state;
    }
}

export const actions = {
    initializingSuccessed: () => ({ type: "network/app/INITIALIZING_SUCCESSED" }) as const
}

export const initializeApp = () => (dispatch: AppDispatch) => {
    let promise = dispatch(getUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializingSuccessed())
        })
}

export default appReducer;

type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>
