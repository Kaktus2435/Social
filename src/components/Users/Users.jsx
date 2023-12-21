import React from "react";
import styles from "./Users.module.css"
import initialPhoto from '../img/Basic_Ui_(186).jpg'
import { NavLink } from "react-router-dom";



const Users = (props) => {
    // let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

    let pages = [];
    for (let i = 1; i <= 10; i++) {
        pages.push(i)
    }
   
    return <div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p && styles.selectedPage}
                    onClick={() => { props.onPageChanged(p); }} >{p}</span>
            })}
        </div>
        {props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>

                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>}
                    </div>

                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                        <NavLink to={"./../profile/" + u.id}>
                            <img className={styles.photos} src={u.photos.small == null ? initialPhoto : u.photos.small} alt="photos" />
                        </NavLink>
                    </span>
                </span>
            </div>)
        }
    </div>
    

}


export default Users;