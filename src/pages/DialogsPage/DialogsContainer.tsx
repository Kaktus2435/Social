import React from "react";
import Dialogs from "./Dialogs.tsx";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.tsx";
import { withRouter } from "../../components/utils/withRouter/withRouter.tsx";
import { useSelector } from "react-redux";
import { getUserSuperSelector } from "../../components/redux/users-selectors.ts";

const DialogsPage = () => {
    const users = useSelector(getUserSuperSelector)

    return<>
        <Dialogs />
        
    </>
}
export default compose<React.ComponentType>(withAuthRedirect, withRouter)(DialogsPage);
