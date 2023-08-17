import css from "./bottons.module.css";
import addPost_img from "./img/Add.svg";
import video_img from "./img/icons8-music.svg";
import profile_img from "./img/profile.svg";

const Buttons = () => {
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
                    <img className={css.button__img_profile} src={profile_img} alt="profile" />
                </button>
            </div>
        </div>
     );
}
 
export default Buttons;