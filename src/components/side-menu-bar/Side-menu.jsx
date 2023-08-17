import css from "./side-menu.module.css";
import img_home from "./img/Home.svg";
import img_profile from "./img/Profile.svg";
import img_chat from "./img/Chat.svg";
import img_explore from "./img/Explore.svg";
import img_friends from "./img/Friends.svg";
import img_settings from "./img/Settings.svg"
import { NavLink } from "react-router-dom";

const setActive =({isActive}) => isActive? css.active : '';

const SideMenu = () => {
    return ( 
        <div className={css.menu}>
            <ul className={css.menu__list}>
                <li>
                    <NavLink className={setActive} to="/">
                        <img src={img_home} alt="home" className={css.menu__listImg} />
                        </NavLink>
                    </li>
                <li>
                    <NavLink className={setActive} to="/profile">
                        <img src={img_profile} alt="profile" className={css.menu__listImg} />
                        </NavLink>
                    </li>
                <li>
                    <NavLink 
                    className={setActive}to="/chats">
                        <img src={img_chat} alt="chat" className={css.menu__listImg} />
                        </NavLink>
                    </li>
                <li>
                    <NavLink className={setActive} 
                    to="/explore">
                        <img src={img_explore} alt="explore" className={css.menu__listImg} />
                        </NavLink>
                    </li>
                <li>
                    <NavLink className={setActive}
                    to="/friends">
                        <img src={img_friends} alt="friends" className={css.menu__listImg} />
                        </NavLink>
                    </li>
                <li>
                    <NavLink className={setActive}
                    to="/settings">
                        <img src={img_settings} alt="settings" className={css.menu__listImg} />
                        </NavLink>
                    </li>
            </ul>
        </div>
     );
}
 
export default SideMenu;
