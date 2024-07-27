import { InferActionTypes } from "./redux.store";


let initialState = {
    messages: null as string | null
};


const chatReducer = (state = initialState, actions: ActionTypes): InitialStateType => {

    switch (actions.type) {

        case 'network/app/GET_MESSAGES':
            return {

                ...state,
                ...actions.messages

            }

        default:
            return state;
    }

}
export const actions = {
    getMessages: (messages) =>
        ({ type: "network/app/GET_MESSAGES", messages } as const)
}

export default chatReducer;

export type InitialStateType = typeof initialState;
type ActionTypes = InferActionTypes<typeof actions>