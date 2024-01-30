import React from "react";
import profilePageReducer, { deletePost } from "./profilePageReducer";
import {addPost} from './profilePageReducer';

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
    let action = addPost('It');
    let newState = profilePageReducer(state, action);

    expect(newState.posts.length).toBe(3);
    
});

it('should check the name', () => {
    let action = addPost('It');
    let newState = profilePageReducer(state, action);

    
    expect(newState.posts[0].name).toBe('Ion');
});

it('after deleting length of messages should be decrement', () => {
    let action = deletePost(1);
    let newState = profilePageReducer(state, action);
 
    expect(newState.posts.length).toBe(1);
    
});