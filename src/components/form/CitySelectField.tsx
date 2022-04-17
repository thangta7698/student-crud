import { Box, FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import { City } from '../../models';


export interface CitySelectFieldProps {
    name: string,
    label: string,
    control: Control<any>,
    options: City[]

}

export default function CitySelectField({ name, label, control, options }: CitySelectFieldProps) {
    const {
        field: { ref, ...props },
        fieldState: { invalid, error },
        formState: { }
    } = useController({
        name,
        control,
    });
    return (
        <Box width={310}>
            <FormControl size="small" fullWidth variant="outlined" error={invalid} >
                <InputLabel id="city">{label}</InputLabel>
                <Select
                    labelId="city"
                    id={name}
                    {...props}
                    label={label}
                    inputRef={ref}
                >
                    <MenuItem value="">
                        <em>City</em>
                    </MenuItem>
                    {options.map((city, index) => (
                        <MenuItem key={index} value={city.code}>{city.name}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
        </Box>
    );
}
