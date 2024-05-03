import React from "react";
import {
    NavigateFunction,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom"


type withRouterProps = {
    router: {
        location: Location;
        navigate: NavigateFunction;
        params: Record<"userId", string | undefined> 
    };
}


export function withRouter (Component): React.FC<withRouterProps> {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

