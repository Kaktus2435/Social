import React from "react";
import Dialogs from "./Dialogs.tsx";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.tsx";
import { withRouter } from "../../components/utils/withRouter/withRouter.tsx";

const DialogsPage = () => {

    return<>
        <Dialogs />
    </>
}
export default compose<React.ComponentType>(withAuthRedirect, withRouter)(DialogsPage);
