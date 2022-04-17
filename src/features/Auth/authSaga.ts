import { PayloadAction } from "@reduxjs/toolkit";
import { actions, LoginPayload } from "./authSlice";
import { take, fork, call, put } from 'redux-saga/effects';
import { push } from "connected-react-router";

function* handleLogin(payload: LoginPayload) {
    console.log('login nè');
    localStorage.setItem('access_token', payload.username);
    yield put(actions.loginSucess({
        id: 1,
        name: 'thang'
    }))
    yield put(push('/home'))
};
function* handleLogout() {
    console.log('logout nè')
    localStorage.removeItem('access_token');
    yield put(push('/login'))
};
function* Watchlogin() {
    while (true) {
        const isLoggined = Boolean(localStorage.getItem('access_token'));
        if (!isLoggined) {
            const action: PayloadAction<LoginPayload> = yield take(actions.login.type);
            yield fork(handleLogin, action.payload)
        }
        else {
            yield take(actions.logout.type);
            yield call(handleLogout);
        }

    }
}
export default function* authSaga() {
    yield fork(Watchlogin);
}