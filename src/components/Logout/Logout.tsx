import * as React from 'react';
import { logout } from '../redux/auth-reducer.ts';
import { useDispatch } from 'react-redux';
import styles from "./Logout.module.css"
import { LogoutOutlined } from '@ant-design/icons';
import { AppDispatch } from '../redux/redux.store.ts';
import CustomButton from '../common/buttons/CustomButton.tsx';
import { useTranslation } from 'react-i18next';


const Logout = () => {
  const {i18n, t} = useTranslation();
    const dispatch = useDispatch<AppDispatch>()
    const logoutCallback = () => {
        dispatch(logout());
    };

    return (<>
        <LogoutOutlined className={styles.logoutIcon__mobile} onClick={logoutCallback} />
        <div className={styles.logoutButton} >
            <CustomButton text={t('logout')} onClick={logoutCallback} />
        </div>
    </>);
}

export default Logout;