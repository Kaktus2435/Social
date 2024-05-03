import {connect} from "react-redux";
import { actions } from "../../redux/profilePageReducer.ts";
import { AppStateType } from '../../redux/redux.store';
import { MapPropsType, DispatchPropsType } from './MyPosts';
import MyPosts from "./MyPosts.tsx"

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts
    }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
    addPost: actions.addPostActionCreator
})(MyPosts);

export default MyPostsContainer;