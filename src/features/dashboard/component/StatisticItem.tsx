import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';

export interface StatisticItemProps {
    icon: React.ReactElement,
    label: string,
    value: string | number

};
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '50px',
        padding: '8px'
    },
    value: {
        textAlign: 'center',
        fontSize: '14px',
    },
    label: {
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 600,

    }

}));

export function StatisticItem({ icon, label, value }: StatisticItemProps) {
    const classes = useStyles();
    return (
        <Paper elevation={1} >
            <Box className={classes.root}>
                <Box>{icon}</Box>
                <Box >
                    <Typography className={classes.label} variant='h5'>{label}</Typography>
                    <Typography className={classes.value} variant='h5'>{value}</Typography>
                </Box>
            </Box>
        </Paper>
    );
}
