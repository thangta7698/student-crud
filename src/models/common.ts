export interface Pagination {
    _limit: number,
    _page: number,
    _totalRows: number,
};
export interface ListRespone<T> {
    data: T[],
    pagination: Pagination,
}
export interface ListParams {
    _page?: number,
    _limit?: number,
    _sort?: string,
    _order?: string,
    [key: string]: any,
}