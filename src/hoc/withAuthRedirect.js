import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { compose } from "redux";

let mapStateToPropsForRedirect = (state) => ({
	isAuth: state.auth.isAuth
})

export const withAuthRedirect = (Component) => {
	class RedirectComponent extends React.Component {
		render(){
			if(this.props.isAuth){
				return <Component {...this.props}/>
			}else if(!this.props.isAuth && !this.props.router){
				return <Navigate to='/login'/>
			}else {
				if(!this.props.isAuth && !this.props.router.params.userId){
					return <Navigate to='/login'/>
				} else {
					if(!this.props.isAuth && this.props.router.params.userId) return <Component {...this.props}/>
				}
			}
		}
	}
	return compose(connect(mapStateToPropsForRedirect, {}))((RedirectComponent));
}