import React from "react";
import Post from "../components/profile/posts/Post";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../components/redux/profilePageReducer";


const Profile = (props) => {

    const postsElements = props.profilePage.posts
        .map(p => <Post name={p.name} post={p.post} />)

    

    const newPost = () => {
        props.dispatch(addPostActionCreator());
    }

    const onPostChange = (e) => {
        const text = e.target.value;
        props.dispatch(updateNewPostTextActionCreator(text));
    }


    return (
        <div className="">
            {postsElements}
            <textarea 
                value={props.profilePage.myNewPost}
                onChange={onPostChange} ></textarea>
            <button onClick={newPost}>Add Post</button>
        </div>
    );
}

export default Profile;