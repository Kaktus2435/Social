import React from "react";



const Home = (props) => {

    
        let pages = [];
      
      
    return <div>
        <div>
            {pages.map(p => {
                return <span>{p}</span>
            })}
        </div>
        {props.users.map(h => <div key={h.id}>
            <div>{h.name}</div>
            <div>{h.id}</div>
        </div>)}
    </div>
}


export default Home;
