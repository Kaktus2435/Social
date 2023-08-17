const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST = 'UPDATE_NEW_POST';

const initialState = { 
    posts: [
            {
                name: "Ion",
                post: "Iuhu"
            },
        ],
        myNewPost: "Post"
    
};

const profilePageReducer = (state = initialState, action) => {
    if (action.type === ADD_POST) {
        const post = {
            name: "Incognito",
            post: state.myNewPost
        }
        state.posts.push(post);
        state.myNewPost = "";
        
    } else if (action.type === UPDATE_NEW_POST) {
        state.myNewPost = action.newPost;
        
    }
    return state;
}

export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    }
}

export const updateNewPostTextActionCreator = (newPost) => {
    return {
        type: UPDATE_NEW_POST, newPost: newPost
    }
}

export default profilePageReducer;