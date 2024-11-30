import React, { ComponentType } from "react";
import {
    NavigateFunction,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

type withRouterProps = {
    router: {
        location: Location;
        navigate: NavigateFunction;
        params: Record<string, string | undefined>; // Tipul e acum mai generic
    };
};

export function withRouter<P extends object>(Component: ComponentType<P>) {
    const ComponentWithRouterProp: React.FC<P> = (props) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();

        return (
            <Component
                {...props as P} // Aici asigurăm că props-urile originale sunt păstrate
                router={{ location, navigate, params }}
            />
        );
    };

    return ComponentWithRouterProp;
}
