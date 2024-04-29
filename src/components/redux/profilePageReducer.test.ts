import profilePageReducer from "./profilePageReducer.ts";
import {actions} from "./profilePageReducer.ts" 
const state = {
    posts: [
        {
            id: 1,
            name: "Ion",
            post: "Iuhu"
        },
        {
            id: 2,
            name: "Alex",
            post: "Iu"
        },
    ],
};


 it('new post should bew added', () => {
    let action = actions.addPost('It');
    let newState = profilePageReducer(state, action);

    expect(newState.posts.length).toBe(3);
    
});

it('should check the name', () => {
    let action = actions.addPost('It');
    let newState = profilePageReducer(state, action);

    
    expect(newState.posts[0].name).toBe('Ion');
});

