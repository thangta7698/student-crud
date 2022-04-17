import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Student } from '../../../models';
import { useEffect } from 'react';
import studentApi from '../../../api/studentApi';
import { Box, Typography } from '@material-ui/core';
import StudentForm from '../components/StudentForm';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

export interface AddandEditPageProps {
}


export default function AddandEditPage(props: AddandEditPageProps) {
    const history = useHistory();
    const [student, setStudent] = useState<Student>();
    const { studentId } = useParams<{ studentId: string }>();
    useEffect(() => {
        (async () => {
            if (!studentId) return;
            const data: Student = await studentApi.getById(studentId);
            setStudent(data);
        }

        )()
    }, [studentId])
    const isEdit = Boolean(studentId);
    const initialValue: Student = {
        name: '',
        age: '',
        mark: '',
        gender: '',
        city: '',
        ...student,
    } as Student;
    const handleSubmit = async (formValues: Student) => {
        if (isEdit) {
            await studentApi.update(formValues);
            console.log('update');
        }
        else {
            await studentApi.add(formValues);
            console.log('add');

        }
        history.push('/home/student')
    };
    return (
        <Box padding={2}>
            {!isEdit ? <Typography variant='h5'>Add Page</Typography> : <Typography variant='h5'>Edit Page</Typography>}
            <Link style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', width: '300px' }} to='/home/student'>
                <ArrowBackIosOutlinedIcon color='primary' />
                <Typography variant='h6' color='primary'  >Back to student</Typography>
            </Link>
            {(!isEdit || Boolean(student)) &&
                <StudentForm initialValue={initialValue} onSubmit={handleSubmit} />
            }
        </Box>
    );
}
