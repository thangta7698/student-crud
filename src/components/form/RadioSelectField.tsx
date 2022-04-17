import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import React, { InputHTMLAttributes, useState } from 'react';
import { Control, useController } from 'react-hook-form';

export interface RadioOption {
    value: string,
    label: string,
}
export interface RadioSelectFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    name: string,
    control: Control<any>,
    options: RadioOption[]

}

export default function RadioSelectField({ label, name, control, options, ...inputProps }: RadioSelectFieldProps) {
    const {
        field: { ref, value, onBlur, onChange },
        fieldState: { invalid, error },
        formState: { }
    } = useController({
        name,
        control,


    });
    return (
        <div>
            <FormControl size='small' component="fieldset" error={invalid}  >
                <FormLabel component="legend">{label}</FormLabel>
                <RadioGroup name={name} value={value} onChange={onChange} onBlur={onBlur} >
                    {options.map((option, index) => (
                        <FormControlLabel key={index} value={option.value} control={<Radio />} label={option.label} />
                    ))}
                </RadioGroup>
                <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
        </div>
    );
}
