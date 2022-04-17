import { City, ListParams, ListRespone, Pagination, Student } from "../models";
import userClient from "./userClient";

const studentApi = {
    getAll(params: ListParams): Promise<ListRespone<Student>> {
        const url = '/students';
        return userClient.get(url, { params })
    },
    getById(id: string): Promise<Student> {
        const url = `/students/${id}`;
        return userClient.get(url)
    },
    add(data: Student): Promise<Student> {
        const url = '/students';
        return userClient.post(url, data)
    },
    update(data: Partial<Student>): Promise<Student> {
        const url = `/students/${data.id}`;
        return userClient.patch(url, data)
    },
    delete(id?: string): Promise<any> {
        const url = `/students/${id}`
        return userClient.delete(url)
    },

}


export default studentApi;