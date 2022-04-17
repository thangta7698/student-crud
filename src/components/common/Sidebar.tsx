import { Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { NoEncryptionTwoTone } from '@material-ui/icons';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DraftsIcon from '@material-ui/icons/Drafts';
import PeopleIcon from '@material-ui/icons/People';
import React from 'react';
import { NavLink } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 350,
        backgroundColor: theme.palette.background.paper,
        '& > nav ': {
            padding: 0,
        }

    },
    links: {
        textDecoration: 'none',
        color: 'inherit',
        '&.active > div': {
            backgroundColor: theme.palette.action.selected,
        }

    },





}));

export interface ISidebarProps {
}

export function Sidebar(props: ISidebarProps) {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                <NavLink to='/home/dashboard' className={classes.links}>
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dasboard" />
                    </ListItem>
                </NavLink>
                <NavLink to='/home/student' className={classes.links}>
                    <ListItem button >
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Student" />
                    </ListItem>
                </NavLink>

            </List>
        </Box>
    );
}
