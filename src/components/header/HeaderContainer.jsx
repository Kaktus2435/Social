import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
<<<<<<< HEAD
import { logout } from "../redux/auth-reducer";

class HeaderContainer extends React.Component {
=======
import { getUserData, logout } from "../redux/auth-reducer";
import {} from "../redux/profilePageReducer"



class HeaderContainer extends React.Component {
   componentDidMount() {
      this.props.getUserData()
   }
>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7

   render() {
      return <>
         <Header {...this.props}
<<<<<<< HEAD

=======
            
>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7
            profile={this.props.profile}
         />
      </>
   }
}
<<<<<<< HEAD

const mapStateToProps = (state) => ({
   isAuth: state.auth.isAuth,
   login: state.auth.login,
});

export default connect(mapStateToProps, { logout })(HeaderContainer);
=======
const mapStateToProps = (state) => ({
   isAuth: state.auth.isAuth,
   login: state.auth.login,
   logout: state.auth.logout,
   profile: state.profilePage.profile,
});

export default connect(mapStateToProps, { getUserData, logout })(HeaderContainer);
>>>>>>> dce12c4e69743825c35f82af172bdbd5c759dba7
