import * as React from 'react';
import CustomButton from '../buttons/CustomButton.tsx';
import { logout } from '../redux/auth-reducer.ts';
import { useDispatch } from 'react-redux';
import styles from "./Logout.module.css"
import { LogoutOutlined } from '@ant-design/icons';
import { AppDispatch } from '../redux/redux.store.ts';


const Logout = () => {

    const dispatch = useDispatch<AppDispatch>()
    const logoutCallback = () => {
        dispatch(logout());
    };

    return (<>
        <LogoutOutlined className={styles.logoutIcon__mobile} onClick={logoutCallback} />
        <div className={styles.logoutButton} >
            <CustomButton text='Logout' onClick={logoutCallback} />
        </div>
    </>);
}

export default Logout;