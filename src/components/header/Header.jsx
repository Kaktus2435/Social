import Buttons from "../Header/ButtonsHeader/Buttons";
import styles from "./header.module.css";
import Search from "./search/Search";


const Header = (props) => {
    return (
        
        <header className={styles.header}>
            <div className={styles.cotainer}>
                <div className={styles.header__logo}>
                    JassBee.in
                </div>
                <Search />
                <Buttons isAuth={props.isAuth} login={props.login} logout={props.logout}
               
                profile={props.profile}
                />
            </div>
        </header>
    );
}

export default Header;