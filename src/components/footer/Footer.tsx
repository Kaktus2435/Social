import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Contact from "../../pages/ProfilePage/ProfileInfo/Contact.tsx";
import s from "./Footer.module.css";
import { getProfile, getProfilePage } from "../redux/profile-selectors.ts";

const Footer = () => {

    const profile = useSelector(getProfile)
    const dispatch = useDispatch
    useEffect(() => {
        
    }, [] )

    return ( 
        <div className={s.footer}>
            
        </div>
     );
}
 
export default Footer;