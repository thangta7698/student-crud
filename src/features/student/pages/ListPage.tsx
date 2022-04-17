import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import * as React from 'react';
import cityApi from '../../../api/cityApi';
import studentApi from '../../../api/studentApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { City, ListParams, Student } from '../../../models';
import Widget from '../../dashboard/component/Widget';
import StudentFilters from '../components/StudenFilters';
import StudentTable from '../components/StudentTable';
import { studentActions } from '../studentSlice';
import { useSnackbar } from 'notistack';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
export interface ListPageProps {

}
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    addNewStudent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& > a': {
            textDecoration: 'none',
        }

    },
    linearProgress: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
    },
}))
export default function ListPage(props: ListPageProps) {
    const { url } = useRouteMatch();
    console.log(url);
    const history = useHistory();
    const classes = useStyles();
    const [cityList, setCityList] = React.useState<Array<City>>([]);
    const loading = useAppSelector((state) => state.student.loading);
    const filters = useAppSelector((state) => state.student.filter);
    const studentList = useAppSelector((state) => state.student.studentList);
    const pagination = useAppSelector((state) => state.student.pagination);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    // fetch studentList
    React.useEffect(
        () => {
            dispatch(studentActions.fetchStudent(filters))
        }, [dispatch, filters]
    )
    // Fetch cityList
    React.useEffect(() => {
        (async () => {
            const cityList: Array<City> = await cityApi.getAll();
            setCityList(cityList)
        })()
    }, []);
    // Handle page change
    const handlePageChange = (e: any, page: number): void => {
        dispatch(studentActions.setFilter({
            ...filters,
            _page: page
        }))
    };
    const handleFilterChange = (newFilters: ListParams) => {
        dispatch(studentActions.setFilter(newFilters))
    }
    // Create cityMap
    const cityMap = cityList.reduce((newCityList: { [key: string]: City }, city) => {
        newCityList[city.code] = city;
        return newCityList;
    }, {});
    // Hanlde delete student
    const handleDeleteStudent = async (student: Student) => {
        try {
            await studentApi.delete(student.id);
            const newFilters = { ...filters };
            dispatch(studentActions.setFilter(newFilters));

        }
        catch (error) {
            // console.log("error: ", error);
        }
        finally {
            enqueueSnackbar("Delete successfully", { variant: 'success' });
        }
    }

    return (
        <Box className={classes.root}>
            <Box className={classes.linearProgress}>{loading ? <LinearProgress /> : null}</Box>
            <Box >
                <Box className={classes.addNewStudent}>
                    <Typography style={{ fontSize: '30px' }} variant='h4'>Student</Typography>
                    <Link to={`${url}/add`}>
                        <Button variant="contained" color="primary" >
                            Add new student
                        </Button>
                    </Link>
                </Box>
                <Box mt={2} ><StudentFilters filters={filters} onFilterChange={handleFilterChange} /></Box>
                <Box mt={2}>
                    <Widget title=''>
                        <StudentTable studentList={studentList} cityMap={cityMap} onDelete={handleDeleteStudent} />
                    </Widget>
                </Box>
                <Box mt={2} className={classes.pagination}>
                    <Pagination count={Math.ceil(pagination._totalRows / pagination._limit)} color="primary"
                        onChange={handlePageChange}
                    />
                </Box>
            </Box>
        </Box>
    );
}
