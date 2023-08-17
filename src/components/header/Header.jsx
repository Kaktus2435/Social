import Buttons from "./Buttons header/Buttons";
import css from "./header.module.css";
import Search from "./search/Search";


const Header = () => {
    return (
        <header className={css.header}>
            <div className={css.cotainer}>
                <div className={css.header__logo}>
                    JassBee.in
                </div>
                <Search />
                <Buttons />
            </div>
        </header>
    );
}

export default Header;