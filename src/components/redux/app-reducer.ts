import { getUserData } from "./auth-reducer.ts";
import { InferActionTypes } from "./redux.store.ts";

type InitialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>

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
    initializingSuccessed: () => ( { type: "network/app/INITIALIZING_SUCCESSED" }) as const
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getUserData());
    Promise.all([promise])
    .then(()=>{
        dispatch(actions.initializingSuccessed())
    })
}

// export const initializeApp = () => async dispatch => {
// 	let promise = []
// 	promise.push(dispatch(getUserData()))
// 	await Promise.all(promise)
// 	dispatch(initializingSuccessed())
// }
export default appReducer;

