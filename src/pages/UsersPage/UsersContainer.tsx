import { useSelector } from "react-redux";
import React from "react";
//@ts-ignore
import {
    getIsFetching
    } from "../../components/redux/users-selectors.ts";
import { Users } from "./Users.tsx";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.tsx";
import { withRouter } from "../../components/utils/withRouter/withRouter.tsx";
import Preloader from "../../components/utils/preloader/Preloader.jsx";



const UsersPage: React.FC = (props) => {

    const isFetching = useSelector(getIsFetching)

    return <div style={{ display: 'flex', flexDirection:'column',alignItems:'center' }} >

        {isFetching ? <Preloader /> : null} 
        <div>
            <Users />
        </div> 
    </div>

}

export default compose<React.ComponentType>(withAuthRedirect, withRouter)(UsersPage);