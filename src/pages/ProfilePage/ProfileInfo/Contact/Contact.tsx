import React from "react";
import { FacebookOutlined, GithubOutlined, GlobalOutlined, InstagramOutlined, LinkOutlined, XOutlined, YoutubeOutlined } from "@ant-design/icons";
import styles from "./Contact.module.css"


const Contact = ({ contactTitle, contactValue }) => {

    const contactIcons = {
        facebook: <FacebookOutlined className={styles.contactIcon} style={{color: "#3b5998" }} />,
        website: <GlobalOutlined className={styles.contactIcon} style={{color: "#000000" }} />,
        vk: <img className={styles.contactImgIcon} style={{margin: "2px"}} src="https://upload.wikimedia.org/wikipedia/commons/2/21/VK.com-logo.svg" alt="" />,
        twitter: <XOutlined className={styles.contactIcon} style={{color: "#000000" }} />,
        instagram: <InstagramOutlined className={styles.contactIcon} style={{color: "#E4405F" }} />,
        youtube: <YoutubeOutlined className={styles.contactIcon} style={{color: "#FF0033" }} />,
        github: <GithubOutlined className={styles.contactIcon} style={{color: "#010409" }} />,
        mainlink: <LinkOutlined className={styles.contactIcon} style={{color: "#555555" }} />
    };

    const contactIcon = contactIcons[contactTitle.toLowerCase()] || null;

    return (
        <div>
          <a className={styles.links} href={contactValue} target="_blank" rel="noopener noreferrer">
            {contactIcon}
          </a>
        </div>
      );
    };

    export default Contact;