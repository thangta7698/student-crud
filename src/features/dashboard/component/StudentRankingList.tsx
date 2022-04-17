import * as React from 'react';
import { Student } from '../../../models';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import { getMarkColor } from '../../../ultils/feature';

export interface StudentRankingListProps {
    studentList: Student[],
}
const useStyles = makeStyles({

});
export function StudentRankingList({ studentList }: StudentRankingListProps) {
    const classes = useStyles();
    return (
        <TableContainer>
            <Table size='small'  >
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 600 }} align='center'>#</TableCell>
                        <TableCell style={{ fontWeight: 600 }} align="center">Name</TableCell>
                        <TableCell style={{ fontWeight: 600 }} align="center">Mark</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {studentList.map((student, index) => (
                        <TableRow key={student.id}>
                            <TableCell align="left" >
                                {index + 1}
                            </TableCell>
                            <TableCell align="left">{student.name}</TableCell>
                            <TableCell align="center">
                                <Box color={getMarkColor(student.mark)} >
                                    {student.mark}
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>

    );
}
