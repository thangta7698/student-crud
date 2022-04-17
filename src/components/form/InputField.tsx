import { FormHelperText, TextField } from '@material-ui/core';
import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    label: string,
    control: Control<any>,

}

export default function InputField({ name, label, control, ...inputProps }: InputFieldProps) {
    const {
        field: { ref, value, onBlur, onChange },
        fieldState: { invalid, error },
        formState: { }
    } = useController({
        name,
        control,
    });
    console.log(error, invalid);
    return (
        <div>
            <TextField
                size="small"
                fullWidth
                id={name}
                label={label}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                margin='normal'
                variant="outlined"
                inputRef={ref}
                error={invalid}
                helperText={error?.message}
                inputProps={inputProps}

            />
        </div >
    );
}
