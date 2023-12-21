import { getUserData } from "./auth-reducer";

const INITIALIZING_SUCCESSED = "INITIALIZING_SUCCESSED";

let initialState = {
    initialized: false

};

const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case INITIALIZING_SUCCESSED:
            return {
                ...state, initialized: true
            }
        default:
            return state;
    }
}

//action creators
export const initializingSuccessed = () => ( { type: INITIALIZING_SUCCESSED })
//thunk creators
export const initializeApp = () => async dispatch => {
debugger
	let promise = []
	promise.push(dispatch(getUserData()))
	await Promise.all(promise)
	dispatch(initializingSuccessed())
}
export default appReducer;

