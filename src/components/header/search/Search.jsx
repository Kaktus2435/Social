import c from "./search.module.css";
import img from "../../img/Search.svg";
import React from "react";

const Search = () => {
    const serchElement = React.createRef () ;
    const serch = () => {
        let text = serchElement.current.value;
        alert(text);
    }
    return (
        <div className={c.search}>
            <div className={c.container}>
                <button onClick={serch}
                 className={c.search__button}>
                <img src={img} alt="" className={c.search__img} />
                </button>
                <input ref={serchElement} className={c.search__input} type="text"
                    placeholder="Search for creators, inspirations, travel video projects..." />
            </div>
        </div>
    );
}

export default Search;