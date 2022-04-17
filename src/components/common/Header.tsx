import React from 'react';
import { Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/Auth/authSlice';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
export interface IHeaderProps {
}

export function Header(props: IHeaderProps) {
    const dispatch = useAppDispatch();
    const classes = useStyles();
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Student Management
                    </Typography>
                    <Button onClick={() => { dispatch(actions.logout()) }} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
