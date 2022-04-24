import { PayloadAction } from "@reduxjs/toolkit";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import studentApi from "../../api/studentApi";
import { ListParams, ListRespone, Student } from "../../models";
import { studentActions } from "./studentSlice";


function* handleFetchStudent(action: PayloadAction<ListParams>) {
    const response: ListRespone<Student> = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentSuccess(response));

};
function* handleSetFilterDebounce(action: PayloadAction<ListParams>) {
    yield put(studentActions.setFilter(action.payload));
}

export default function* studentSaga() {
    yield takeLatest(studentActions.fetchStudent.type, handleFetchStudent);
    yield debounce(500, studentActions.setFilterDebonce.type, handleSetFilterDebounce)
}
