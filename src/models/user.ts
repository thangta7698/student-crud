export interface User {
    id: string | number,
    name: string,
}
// export interface loginUser {
//     email: string,
//     password: number,
// }
export interface ListCurrentUser<T> {
    listCurrentUser: T[]
}