import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export interface PrivateRoute {
}

export function PrivateRoute(props: RouteProps) {
    const isLoggined = !!localStorage.getItem('access_token');
    if (!isLoggined) return <Redirect to='/login' />;
    else {
        return <Route {...props} />
    }
}
