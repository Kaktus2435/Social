import React from "react";
import Header, {MapPropsType, DispatchPropsType} from "./Header.tsx";
import { connect } from "react-redux";
import { logout } from "../redux/auth-reducer.ts";
import { AppStateType } from "../redux/redux.store.ts";
import { getProfile } from "../redux/profile-selectors.ts";

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {
   render() {
      return <Header {...this.props} />
   }
}


const mapStateToProps = (state: AppStateType) => ({
   isAuth: state.auth.isAuth,
   login: state.auth.login,
   profile: getProfile(state)
} as MapPropsType );
// class HeaderContainer extends React.! {

//    render() {
//       return <>
//          <Header {...this.props}

//             profile={this.props.profile}
//          />
//       </>
//    }
// }

// const mapStateToProps = (state) => ({
//    isAuth: state.auth.isAuth,
//    login: state.auth.login,
// });

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>
(mapStateToProps, { logout })(HeaderContainer);