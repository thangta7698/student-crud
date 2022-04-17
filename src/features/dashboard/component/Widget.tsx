import { Box, makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';

export interface WidgetProps {
    title: string,
    children: any,
}
const useStyles = makeStyles(theme => ({
    root: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '5px',
        padding: '0 8px 0 8px'
    },
    title: {
        fontSize: '20px',
        textAlign: 'center',
        borderBottom: `1px solid ${theme.palette.divider}`,
        height: '30px'

    }
}));
export default function Widget({ title, children }: WidgetProps) {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Typography className={classes.title} variant='h5' >{title}</Typography>
            <Box mt={1}>{children}</Box>
        </Box>
    );
}
