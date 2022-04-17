import { Box } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddandEditPage from './pages/AddandEditPage';
import ListPage from './pages/ListPage';

export interface StudentProps {
}


export default function Student(props: StudentProps) {
    const { url } = useRouteMatch();
    console.log(url);
    return (
        <Box>
            <Switch>
                <Route path={url} exact>
                    <ListPage />
                </Route>
                <Route path={`${url}/add`}  >
                    <AddandEditPage />
                </Route>
                <Route path={`${url}/edit/:studentId`}  >
                    <AddandEditPage />
                </Route>
            </Switch>
        </Box >

    );
}
