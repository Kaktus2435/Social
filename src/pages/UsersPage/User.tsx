import React, { useState } from "react";
import styles from "./Users.module.css";
//@ts-ignore
import initialPhoto from '../../img/Basic_Ui_(186).jpg';
import { NavLink, useNavigate } from "react-router-dom";
import { UserType } from "../../types/types.ts";
import { } from "../../components/redux/dialogsPageReducer.ts";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import CustomButton from "../../components/common/buttons/CustomButton.tsx";

type PropsType = {
    user: UserType;
    followingInProgress: Array<number>;
    unfollow: (id: number) => void;
    follow: (id: number) => void;
};

const User: React.FC<PropsType> = ({ user, followingInProgress, unfollow, follow }) => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/dialogs");
    };

    return (
        <div className={styles.container} >
            <span  >
                <div style={{display:"flex", justifyContent:"center"}} >
                    <Card className={styles.card}
                        hoverable
                        style={{ width: 260 }}
                        cover={
                            <NavLink to={"./../profile/" + user.id}>

                                <img style={{height:"250px"}}
                                    className={styles.photos}
                                    src={user.photos.large == null ? initialPhoto : user.photos.large}

                                    alt="photos"
                                /> </NavLink>
                        }>

                        <div>
                            {user.followed ? (
                                <CustomButton text="Unfollow"
                                    disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => unfollow(user.id)}
                                />
                            ) : (
                                <CustomButton className={styles.followUnfollowButton} text="Follow"
                                    disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => follow(user.id)}
                                />
                            )}
                        </div>

                        <NavLink to={"./../profile/" + user.id}>
                            <Meta style={{height:"100px"}} title={<span style={{fontSize:"30px"}} >{user.name}</span>}
                                  description={<span style={{ fontWeight: "bold", borderRadius: "5px", padding:"5px"}} >{user.status}</span>} />
                        </NavLink>
                        
                    </Card>
                </div>
            </span>
        </div>
    );
};

export default User;
