import { getUserData } from "./auth-reducer.ts";

const INITIALIZING_SUCCESSED = "network/app/INITIALIZING_SUCCESSED";

type InitializingSuccessedActionType = {
    type: typeof INITIALIZING_SUCCESSED
}

export type InitialStateType ={
    initialized: boolean;
} 

let initialState : InitialStateType = {
    initialized: false

};

const appReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case INITIALIZING_SUCCESSED:
            return {
                ...state, initialized: true
            }
        default:
            return state;
    }
}


export const initializingSuccessed = (): InitializingSuccessedActionType => ( { type: INITIALIZING_SUCCESSED })

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getUserData());
    Promise.all([promise])
    .then(()=>{
        dispatch(initializingSuccessed())
    })
}

// export const initializeApp = () => async dispatch => {
// 	let promise = []
// 	promise.push(dispatch(getUserData()))
// 	await Promise.all(promise)
// 	dispatch(initializingSuccessed())
// }
export default appReducer;

