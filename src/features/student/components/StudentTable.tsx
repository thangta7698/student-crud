import { Box, Button, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useState } from 'react';
import { City } from '../../../models';
import { Student } from '../../../models';
import { editGender, getMarkColor } from '../../../ultils/feature';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles({

});


export interface StudentTableProps {
    studentList: Student[],
    cityMap: {
        [key: string]: City,
    },
    onEdit?: (student: Student) => void,
    onDelete?: (student: Student) => void,
}

export default function StudentTable({ studentList, onDelete, onEdit, cityMap }: StudentTableProps) {
    const { url } = useRouteMatch();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const [selectedStudent, setSelectedStudent] = useState<Student>();
    const handleDeleteClick = (student: Student) => {
        setSelectedStudent(student);
        setOpen(true);
    };
    const handleDelete = () => {
        if (!onDelete) return;
        onDelete?.(selectedStudent as Student)
        setOpen(false);
    }
    return (
        <Box >
            <TableContainer >
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell width={300} align="center">#</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Age</TableCell>
                            <TableCell align="center">Mark</TableCell>
                            <TableCell align="center">Gender</TableCell>
                            <TableCell align="center">City</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentList.map((student, index) => (
                            <TableRow key={student.id}>
                                <TableCell align="center">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{student.name}</TableCell>
                                <TableCell align="center">{student.age}</TableCell>
                                <TableCell align="center">
                                    <Box color={getMarkColor(student.mark)} fontWeight="bold">
                                        {student.mark}
                                    </Box>
                                </TableCell>
                                <TableCell align="center">{editGender(student.gender)}</TableCell>
                                <TableCell align="center">{student.city ? cityMap[student.city]?.name : null}</TableCell>
                                <TableCell align="right">
                                    <Link to={`${url}/edit/${student.id}`}>
                                        <Button size="small" variant="contained" color="primary"
                                        >
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button size="small" variant="contained" color="secondary"
                                        onClick={() => { handleDeleteClick(student) }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="responsive-dialog-title">{"Do you want to delete?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Do you want to delete "{`${selectedStudent?.name}`}" out of list?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={() => { handleDelete() }} color="secondary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>

        </Box >


    );
}
