import React from "react";
import Buttons from "./ButtonsHeader/Buttons";
import styles from "./header.module.css";
import { ProfileType } from "../../types/types";

export type MapPropsType = {
    isAuth: boolean
    login: string | null
    profile: ProfileType
}

export type DispatchPropsType = {
    logout: () => void 
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    return (
        
        <header className={styles.header}>
            <div className={styles.cotainer}>
                <div className={styles.header__logo}>
                    JassBee.in
                </div>
                <Buttons 
                isAuth={props.isAuth} 
                login={props.login} 
                logout={props.logout}
                profile={props.profile}
                />
            </div>
        </header>
    );
}

export default Header;