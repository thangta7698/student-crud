import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import userClient from "../../api/userClient";
import { ListCurrentUser, User } from "../../models";
export interface LoginPayload {
    username: string,
    password: string,
}
export interface AuthState {
    isLoggined: boolean,
    logging?: boolean,
    currentUser?: User,
}
const initialState: AuthState = {
    isLoggined: false,
    logging: false,
    currentUser: undefined,

}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            state.logging = true;
        },
        loginSucess(state, action: PayloadAction<User>) {
            state.logging = false;
            state.isLoggined = true;
            state.currentUser = action.payload
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.logging = false;
            state.isLoggined = false;

        },
        logout(state) {
            state.isLoggined = false;
            state.currentUser = undefined;
        },

    }
})
const { actions, reducer } = authSlice;
export { actions };
export default reducer;