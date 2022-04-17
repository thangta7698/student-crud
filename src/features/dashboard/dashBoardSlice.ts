import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Student } from "../../models";

export interface DashboardStatistics {
    maleCount?: number,
    femaleCount?: number,
    highMarkCount?: number,
    lowMarkCount?: number,
}
export interface RankingByCity {
    cityId: string,
    cityName: string,
    rankingList: Student[],
}
export interface DashboardState {
    loading: boolean,
    statistics: DashboardStatistics,
    highestStudentList: Student[],
    lowestStudentList: Student[],
    rankingByCityList: RankingByCity[],
}
const initialState: DashboardState = {
    loading: false,
    statistics: {
        maleCount: 0,
        femaleCount: 0,
        highMarkCount: 0,
        lowMarkCount: 0,
    },
    highestStudentList: [],
    lowestStudentList: [],
    rankingByCityList: [],
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        fetchData(state) {
            state.loading = true;
        },
        fetchDataSuccess(state) {
            state.loading = false;
        },
        fetchDataFailed(state) {
            state.loading = false;
        },
        setStatistics(state, action: PayloadAction<DashboardStatistics>) {
            state.statistics = action.payload;
        },
        setHighestStudent(state, action: PayloadAction<Student[]>) {
            state.highestStudentList = action.payload;
        },
        setLowestStuden(state, action: PayloadAction<Student[]>) {
            state.lowestStudentList = action.payload;
        },
        setRankingByCity(state, action: PayloadAction<RankingByCity[]>) {
            state.rankingByCityList = action.payload;
        }

    }


})
const { actions, reducer } = dashboardSlice;
export default reducer;
export const dashboardActions = actions;



