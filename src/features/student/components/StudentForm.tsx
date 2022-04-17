import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import * as React from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import CitySelectField from '../../../components/form/CitySelectField';
import InputField from '../../../components/form/InputField';
import RadioSelectField from '../../../components/form/RadioSelectField';
import { Student } from '../../../models';

export interface StudentFormProps {
    onSubmit?: (formValue: Student) => void,
    initialValue: Student,
};

const schema = yup.object().shape({
    name: yup.string().required('Please enter name'),
    age: yup.number()
        .positive('Please enter positive number.')
        .integer('Please enter interger number')
        .typeError('Please enter a valid number')
        .required('Please enter age'),
    mark: yup.number()
        .positive('Please input positive number.')
        .required('Please enter age')
        .typeError('Please enter a valid number'),

});


export default function StudentForm({ onSubmit, initialValue, }: StudentFormProps) {
    const { control, handleSubmit, formState: { isSubmitting } } = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });
    const handleFormSubmit = async (formValues: Student) => {
        if (!onSubmit) return;
        try {
            await onSubmit?.(formValues);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Box >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField control={control} name='name' label='Name' />
                <InputField control={control} name='age' label='Age' />
                <InputField control={control} name='mark' label='Mark' />
                <RadioSelectField control={control} name='gender' label='Gender' options={[
                    { label: 'Female', value: 'female' },
                    { label: 'Male', value: 'male' }
                ]} />
                <CitySelectField control={control} name='city' label='City' options={[
                    { name: 'Hồ Chí Minh', code: 'hcm' },
                    { name: 'Hà Nội', code: 'hn' },
                    { name: 'Phan Thiết', code: 'pt' },
                    { name: 'Đà Nẵng', code: 'dn' },
                ]} />
                <Box mt={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="medium"
                        disabled={isSubmitting}
                    >
                        {isSubmitting && <CircularProgress color="primary" size={20} />}
                        Save
                    </Button>
                </Box>
            </form>
        </Box>
    );

}

