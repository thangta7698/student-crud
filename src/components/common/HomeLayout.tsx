import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { Dashboard } from '../../features/dashboard';
import Student from '../../features/student';
import { Header } from './index';
import { Sidebar } from './index';

export interface IHomeLayoutProps {
}
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '300px 1fr',
        gridTemplateAreas: '"header header" "sidebar main"',
        minHeight: '100vh',


    },
    header: {
        gridArea: 'header',

    },
    sidebar: {
        gridArea: 'sidebar',
        borderRight: `1px solid ${theme.palette.divider}`
    },
    main: {
        gridArea: 'main',
        positon: 'relative',
    }
}))

export function HomeLayout(props: IHomeLayoutProps) {
    const dispatch = useAppDispatch()
    const { url } = useRouteMatch();
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Box className={classes.header} > <Header /></Box>

            <Box className={classes.sidebar}>
                <Sidebar />
            </Box>
            <Box className={classes.main}>

                <Switch >
                    <Route path={`${url}/dashboard`} >
                        <Dashboard />
                    </Route>
                    <Route path={`${url}/student`}  >
                        <Student />
                    </Route>

                </Switch>
            </Box>


        </Box>
    );
}
