import React from "react";
import { FacebookOutlined, GithubOutlined, InstagramOutlined, LinkOutlined, XOutlined, YoutubeOutlined } from "@ant-design/icons";
import styles from "../Profile.module.css"


const Contact = ({ contactTitle, contactValue }) => {

    const contactIcons = {
        facebook: <FacebookOutlined style={{ fontSize: "20px", color: "#3b5998" }} />,
        twitter: <XOutlined style={{ fontSize: "20px", color: "#000000" }} />,
        instagram: <InstagramOutlined style={{ fontSize: "20px", color: "#E4405F" }} />,
        youtube: <YoutubeOutlined style={{ fontSize: "20px", color: "#FF0033" }} />,
        github: <GithubOutlined style={{ fontSize: "20px", color: "#010409" }} />,
        mainlink: <LinkOutlined style={{ fontSize: "20px", color: "#555555" }} />
    };

    const contactIcon = contactIcons[contactTitle.toLowerCase()] || null;

    return (
        <div >
          <a href={contactValue} target="_blank" rel="noopener noreferrer">
            {contactIcon}
          </a>
        </div>
      );
    };

    export default Contact;