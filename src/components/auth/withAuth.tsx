import React, {ComponentType, FC} from 'react';
import {Navigate} from 'react-router-dom';
import {useConfig, useUser} from "../../hooks/auth";
import {IdToken} from "../../types/tokens";
import {Spinner} from "@digdir/design-system-react";
import {ApiConfig} from "../../types/api";

export interface AuthProps {
    id: IdToken;
    config: ApiConfig;
}

const withAuth = <P extends object>(
    Component: ComponentType<P & AuthProps>,
): FC<P> => (props) => {
    const { data: user, isLoading: userLoading } = useUser();
    const { data: config, isLoading: configLoading } = useConfig();

    if (userLoading || configLoading) {
        return <Spinner title={"Laster inn..."} />;
    }

    if (!user!!.isAuthenticated) {
        return <Navigate to={"/"} />;
    }

    return <Component {...(props as P)} id={user!!.user!!} config={config!!}/>;
};

export default withAuth;