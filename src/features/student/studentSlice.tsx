import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListParams, ListRespone, Pagination, Student } from "../../models";

export interface StudentState {
    loading: boolean,
    pagination: Pagination,
    studentList: Student[],
    filter: ListParams,
}
const initialValues: StudentState = {
    loading: false,
    pagination: {
        _limit: 15,
        _page: 1,
        _totalRows: 1,
    },
    studentList: [],
    filter: {
        _limit: 15,
        _page: 1,
    }

};
const studentSlice = createSlice({
    name: 'student',
    initialState: initialValues,
    reducers: {
        fetchStudent(state, action: PayloadAction<ListParams>) {
            state.loading = true;
        },
        fetchStudentSuccess(state, action: PayloadAction<ListRespone<Student>>) {
            state.loading = false;
            state.studentList = action.payload.data;
            state.pagination = action.payload.pagination;
        },
        fetchStudentFail(state, action: PayloadAction<any>) {
            state.loading = false;
        },
        setFilter(state, action: PayloadAction<ListParams>) {
            state.filter = action.payload;
        },
        setFilterDebonce(state, action: PayloadAction<ListParams>) {

        }
    },
},

);
export default studentSlice.reducer;
export const studentActions = studentSlice.actions;
