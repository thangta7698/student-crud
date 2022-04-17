import * as React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@material-ui/core';
import { RankingByCity } from '../dashBoardSlice';
import { getMarkColor } from '../../../ultils/feature';

export interface StudentRankingCityProps {
    studentByCity: RankingByCity
}

export default function StudentRankingCity({ studentByCity }: StudentRankingCityProps) {
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
                    {studentByCity.rankingList.map((student, index) => (
                        <TableRow key={student.id}>
                            <TableCell align="center" >
                                {index + 1}
                            </TableCell>
                            <TableCell align="center">{student.name}</TableCell>
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
