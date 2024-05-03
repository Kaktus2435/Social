import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../components/redux/redux.store";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
	isAuth: state.auth.isAuth
})
export type mapStatePropsType = ReturnType<typeof mapStateToPropsForRedirect> & routerPropsType
type routerPropsType = {
	router: {
		params: {
			userId: number
		}
	}
}

export const withAuthRedirect = (Component: React.ComponentType<mapStatePropsType>) => {
	const RedirectComponent = (props: mapStatePropsType) => {
				if (props.isAuth ) {
					return <Component {...props}/>
				} else if(!props.isAuth && !props.router){
					return <Navigate to='/login'/>
				} 
	}
	return connect(mapStateToPropsForRedirect)(RedirectComponent);
}