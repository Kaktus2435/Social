import React from "react";
import Dialogs from "./Dialogs.tsx";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.tsx";
import { withRouter } from "../utils/withRouter/withRouter.tsx";
import User from "../Users/User.tsx";
import { useSelector } from "react-redux";
import { getUserSuperSelector } from "../redux/users-selectors.ts";

const DialogsPage = () => {
    const users = useSelector(getUserSuperSelector)

    return<>
        <Dialogs />
        
    </>
}
export default compose(withAuthRedirect, withRouter)(DialogsPage);
