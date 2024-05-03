import React from "react";
import styles from "./Users.module.css"
import initialPhoto from '../img/Basic_Ui_(186).jpg'
import { NavLink } from "react-router-dom";
import { UserType } from "../../types/types";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (id: number) => void
    follow : (id: number) =>void
}

const User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
   
    return (
        <div>
                <span>
                    <div>
                        {user.followed
                            ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                unfollow(user.id)
                            }}>Unfollow</button>

                            : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                follow(user.id)
                            }}>Follow</button>}
                    </div>

                </span>
                <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                        <NavLink to={"./../profile/" + user.id}>
                            <img className={styles.photos} src={user.photos.small == null ? initialPhoto : user.photos.small} alt="photos" />
                        </NavLink>
                    </span>
                </span>
            </div>)
}


export default User;