import { City, ListRespone, Pagination } from "../models";
import userClient from "./userClient";

const cityApi = {
    getAll(): Promise<Array<City>> {
        const url = '/cities';
        return userClient.get(url)
    }
}
export default cityApi;