import { all } from "@redux-saga/core/effects";
import authSaga from "../features/Auth/authSaga";
import dashboardSaga from "../features/dashboard/dashboardSaga";
import studentSaga from "../features/student/studentSaga";

export default function* mySaga() {
    yield all([authSaga(), dashboardSaga(), studentSaga()]);
}