import React from "react";
import styles from "./LanguageSwitch.module.css"
import { useTranslation } from "react-i18next";

export const LanguageSwitch = () => {
    const { i18n } = useTranslation('main');
    const [activeButton, setActiveButton] = React.useState('B1');
    const idButton_1= 'B1';
    const idButton_2= 'B2';

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const handleClick = (idButton) => {
        setActiveButton(idButton);};

   const isActiveButton1 = activeButton === idButton_1;
   const isActiveButton2 = activeButton === idButton_2;

   const classButton1 = isActiveButton1 ? styles.buttonPressed : styles.button;
   const classButton2 = isActiveButton2 ? styles.buttonPressed : styles.button;

    return (
        <div className={styles.languageSwitcherContainer}>

                <button className={classButton1} onClick={() => { changeLanguage('en'); handleClick(idButton_1); }}>En</button>

                <button className={classButton2} onClick={() => { changeLanguage('ro'); handleClick(idButton_2); }}>Ro</button>

        </div>
    )
}