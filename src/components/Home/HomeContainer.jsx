import React from "react";
import { connect } from "react-redux";
import { getUsersHome } from "../redux/homeReducer";
import Home from "./Home";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";


class HomeContainer extends React.Component {
    componentDidMount() {
        this.props.getUsersHome()

    }
    render() {
        return <>
            <Home
                users={this.props.users}
                
            />
        </>
    }
}



const mapStateToProps = (state) => {
    return {
        users: state.homePage.users,
     
    }
}

export default compose(
    connect(mapStateToProps,
        { getUsersHome }), withAuthRedirect) (HomeContainer)




