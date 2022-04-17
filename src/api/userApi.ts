import userClient from "./userClient";

const userApi = {
    login(data: any) {
        const url = '/auth/register';
        return userClient.post(url, data)
    },

}
export default userApi;