import { Box, Container, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { StatisticItem } from './component/StatisticItem';
import PeopleIcon from '@material-ui/icons/People';
import { dashboardActions } from './dashBoardSlice';
import Widget from './component/Widget';
import { StudentRankingList } from './component/StudentRankingList';
import StudentRankingCity from './component/StudentRankingCity';
import { RootState } from '../../app/store';

export interface DashboardProps {
}
const useStyles = makeStyles(theme => ({
    root: {
        padding: '0 8px 0 8px',
        position: 'relative',
    },
    loadingProgress: {
        position: 'absolute',
        top: '-20px',
        right: 0,
        left: 0,
    }
}));

export function Dashboard(props: DashboardProps) {
    const classes = useStyles();
    const isLoading = useAppSelector((state) => state.dashboard.loading);
    const statistics = useAppSelector((state) => state.dashboard.statistics);
    const highestStudentList = useAppSelector((state) => state.dashboard.highestStudentList);
    const lowestStudentList = useAppSelector((state) => state.dashboard.lowestStudentList);
    const rankingByCityList = useAppSelector((state) => state.dashboard.rankingByCityList);
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(dashboardActions.fetchData());
    }, [dispatch])

    return (
        <Box className={classes.root}>
            {isLoading ? <Box className={classes.loadingProgress}><LinearProgress /> </Box> : null}
            <Box mt={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={3}  >
                        <StatisticItem
                            icon={<PeopleIcon fontSize='large' color='primary' />}
                            label='Male'
                            value={statistics.maleCount || ''} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}  >
                        <StatisticItem
                            icon={<PeopleIcon fontSize='large' color='primary' />}
                            label='Female'
                            value={statistics.femaleCount || ''} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}  >
                        <StatisticItem
                            icon={<PeopleIcon fontSize='large' color='primary' />}
                            label='High Mark'
                            value={statistics.highMarkCount || ''} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}  >
                        <StatisticItem
                            icon={<PeopleIcon fontSize='large' color='primary' />}
                            label='Low Mark'
                            value={statistics.lowMarkCount || ''} />
                    </Grid>
                </Grid>
                <Box mt={6}>
                    <Typography variant='h5'> Students</Typography>
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={4}>
                                <Widget title='Student with high mark' >
                                    <StudentRankingList studentList={highestStudentList} />
                                </Widget>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <Widget title='Student with low mark' >
                                    <StudentRankingList studentList={lowestStudentList} />
                                </Widget>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box mt={6} >
                    <Typography variant='h5' >Ranking student by city</Typography>
                    <Box mt={2}>
                        <Grid spacing={2} container>
                            {rankingByCityList.map((studentByCity, index) => (
                                <Grid key={index} item xs={12} md={6} lg={4} >
                                    <Widget title={`TP. ${studentByCity.cityName}`} >
                                        <StudentRankingCity studentByCity={studentByCity} />
                                    </Widget>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>

        </Box>
    );
}
