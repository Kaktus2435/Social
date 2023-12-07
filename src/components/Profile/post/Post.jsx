import c from "./post.module.css";

const Post = (props) => {

    return (
        <div className={c.posts}>
            <div className={c.posts__name}>
                {props.name}
            </div>
            <div className={c.posts__post}>
                {props.post}
            </div>
        </div>
    );
}

export default Post;