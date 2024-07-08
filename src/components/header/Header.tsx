import React from "react";
import styles from "./header.module.css";
import { ProfileType } from "../../types/types";
import { Link, NavLink } from "react-router-dom";
import { Row, Col, Menu, Layout, Avatar } from "antd";

export type MapPropsType = {
    isAuth: boolean
    login: string | null
    profile: ProfileType

}

export type DispatchPropsType = {
    logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    const { Header } = Layout;
    return (


        <Header className="header">
            <div className="logo" />

            <Row>
                <Col span={21}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}>

                        <Menu.Item key="1" ><Link to="/users"></Link>Users</Menu.Item>
                    </Menu></Col>
                <Col span={1}>

                    {props.isAuth ?
                        <div>
                            <button onClick={props.logout}>Logout</button>

                        </div>
                        : <NavLink to={'/login'}> <button onClick={props.logout}>
                            Login
                        </button> </NavLink>}

                </Col>
                <Col span={2} >
                {props.isAuth ? <Avatar src={props.profile.photos.small} alt="avatar" /> : null}
               
                </Col>

            </Row>
        </Header>





        /*  <header className={styles.header}>
              
            
         </header> */
    );
}

export default Header;

