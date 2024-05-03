import React from "react"
import styles from "./MyPosts.module.css"
import AddPostForm, { AddPostFormValuesType } from "./AddPostForm/AddPostForm.tsx"
import Post from "./post/Post.tsx"

export type MapPropsType = {
    posts: any
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {
    let postsElements =
        [...props.posts]
            .reverse()
            .map(p => <Post key={p.id} name={p.name} post={p.post}  />);

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.myNewPost);
    }
    

    return (
        <div className={styles.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={onAddPost}/>
            <div className={styles.posts}>
                {postsElements}
            </div>
        </div>
    )
}

const MyPostsMemorized = React.memo(MyPosts);

export default MyPostsMemorized;