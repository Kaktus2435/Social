import React from "react";
import styles from "./Paginator.module.css"




const Paginator = (props) => {
    // let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

    let pages = [];
    for (let i = 1; i <= 10; i++) {
        pages.push(i)
    }
   
    return <div>
            {pages.map(p => {
                return <span className={props.currentPage === p && styles.selectedPage}
                    onClick={() => { props.onPageChanged(p); }} >{p}</span>
            })}
        </div>
    
}


export default Paginator;