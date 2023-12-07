import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { getUserData, logout } from "../redux/auth-reducer";
import {} from "../redux/profilePageReducer"



class HeaderContainer extends React.Component {
   componentDidMount() {
      this.props.getUserData()
   }

   render() {
      return <>
         <Header {...this.props}
            
            profile={this.props.profile}
         />
      </>
   }
}
const mapStateToProps = (state) => ({
   isAuth: state.auth.isAuth,
   login: state.auth.login,
   logout: state.auth.logout,
   profile: state.profilePage.profile,
});

export default connect(mapStateToProps, { getUserData, logout })(HeaderContainer);