import { Box, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { ChangeEvent } from 'react';
import cityApi from '../../../api/cityApi';
import { City, ListParams } from '../../../models';

export interface StudentFiltersProps {
    onFilterChange?: (newFilter: ListParams) => void,
    filters: ListParams,

}


export default function StudentFilters({ onFilterChange, filters }: StudentFiltersProps) {
    const [cityList, setCityList] = React.useState<City[]>([]);

    React.useEffect(() => {
        (async () => {
            const cityList: City[] = await cityApi.getAll();
            setCityList(cityList);
        })()
    }, [])
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        console.log(value);
        if (!onFilterChange) return;
        onFilterChange({
            ...filters,
            'name_like': value,
            _page: 1,

        })

    };
    const handleCityChange = (e: ChangeEvent<{ name?: string, value: any }>) => {
        const value = e.target.value;
        console.log(value);
        if (!onFilterChange) return;
        onFilterChange({
            ...filters,
            city: value ? value : undefined,
        })
    };
    const handleSortChange = (e: ChangeEvent<{ name?: string, value: unknown }>) => {
        const value = e.target.value as string;
        const [sortValue, orderValue] = value.split('.');
        console.log(sortValue, orderValue);
        if (!onFilterChange) return;
        onFilterChange({
            ...filters,
            _sort: sortValue ? sortValue : undefined,
            _order: orderValue ? orderValue : undefined,
        })
    };

    return (
        <Box>
            <Grid spacing={2} container>
                <Grid item xs={12} md={6} lg={4} >
                    <FormControl fullWidth size='small' variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Search by name</InputLabel>
                        <OutlinedInput
                            label="Search by name"
                            onChange={handleChange}
                            endAdornment={<SearchIcon />}
                        />
                    </FormControl>

                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <FormControl fullWidth size='small' variant="outlined" >
                        <InputLabel id="Filter by city">Thành phố</InputLabel>
                        <Select
                            labelId="Filter by city"
                            id="Filter by city"
                            value={filters.city || ""}
                            onChange={handleCityChange}
                            label="Thành phố"
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            {cityList.map((city, index) => (
                                <MenuItem key={index} value={city.code}>{city.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <FormControl fullWidth size='small' variant="outlined" >
                        <InputLabel id="Sort">Sort</InputLabel>
                        <Select
                            labelId="Sort"
                            id="Sort"
                            value={filters._sort ? `${filters._sort}.${filters._order}` : ""}
                            onChange={handleSortChange}
                            label="Sort"
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            <MenuItem value="name.asc">Name ASC</MenuItem>
                            <MenuItem value="name.desc">Name DESC</MenuItem>
                            <MenuItem value="mark.asc">Mark ASC</MenuItem>
                            <MenuItem value="mark.desc">Mark DESC</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box >
    );
}
