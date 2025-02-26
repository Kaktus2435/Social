import React from "react";
import styles from "./button.module.css"

type PropsType = {
    text: string;
    className?: string;
    onClick?: () => void | null;
  };

const CustomButton: React.FC<PropsType> = ({text, className, onClick}) => {
    
    return (
        <button
        className={`${styles.customButton} ${className ? styles[className] : ""}`}
        onClick={onClick}
        
      >
        {text}
      </button>
    )
}
export default CustomButton;