import { NavLink } from "react-router-dom";
import css from "./bottons.module.css";
import addPost_img from "./img/Add.svg";
import video_img from "./img/icons8-music.svg";
import profile_img from "./img/profile.svg";

const Buttons = (props) => {
    return (
        <div className={css.buttons}>
            <div className={css.container}>
                <button className={css.button}>
                    <img className={css.button__img_add} src={addPost_img} alt="addPost" />
                </button>
                <button className={css.button}>
                    <img className={css.button__img_video} src={video_img} alt="video" />
                </button>
                <button className={css.button}>
                    {props.isAuth ?
                        <div>
                            <img className={css.button__img_profile} src={profile_img} alt="profile" />
                            <button onClick={props.logout}>Log out</button>
                        </div>
                        : <NavLink to={'/login'}>Login</NavLink>}
                </button>
            </div>
        </div>
    );
}

export default Buttons;