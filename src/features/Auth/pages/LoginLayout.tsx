import { Box, Button, Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { actions } from '../authSlice';


export function LoginLayout() {
    const dispatch = useAppDispatch();
    return (
        <Paper elevation={1}>
            <Box>
                <Typography variant='h5'>
                    Login
                </Typography>
                <Box mt={4}>
                    <Button onClick={() => { dispatch(actions.login({ username: 'thang', password: 'ta' })) }} variant="contained" color="primary"  >
                        Login
                    </Button>
                </Box>
                (      <Button variant="contained" color="primary" onClick={() => { dispatch(actions.logout()) }} >
                    )                        Logout
                </Button>
            </Box>
        </Paper >
    );
}
