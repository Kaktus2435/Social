// import React from "react";
// import { connect } from "react-redux";
// import { getUsersHome } from "../redux/homeReducer";
// import Home from "./Home";
// import { withAuthRedirect } from "../../hoc/withAuthRedirect";
// import { compose } from "redux";

import { useState } from "react";


// class HomeContainer extends React.Component {
//     componentDidMount() {
//         this.props.getUsersHome()

//     }
//     render() {
//         return <>
//             <Home
//                 users={this.props.users}
                
//             />
//         </>
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         users: state.homePage.users,
     
//     }
// }

// export default compose(
//     connect(mapStateToProps,
//         { getUsersHome }), withAuthRedirect) (HomeContainer)
function HomeContainer () {
    const [counter, setCounter] = useState(0)
    function increment() {
        setCounter((prevCounter) => {
            return prevCounter + 1
        })
        setCounter(prev => prev + 1)
    }
    function decrement() {
        setCounter (counter - 1)
    }
    return (
        <div>
            <h1>A fost tastat de: {counter} ori!</h1>
            <button onClick={increment} >Adauga</button>
            <button onClick={decrement} >Scade</button>
        </div>
    )
}

export default HomeContainer;

