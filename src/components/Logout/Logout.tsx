import * as React from 'react';
import CustomButton from '../buttons/CustomButton.tsx';
import { logout } from '../redux/auth-reducer.ts';
import { useDispatch } from 'react-redux';

const Logout = () => {

    const dispatch = useDispatch()
    const logoutCallback = () => {
        dispatch(logout());
    };

    return (<>
        <CustomButton text='Logout' onClick={logoutCallback} />
    </>);
}

export default Logout;