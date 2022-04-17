import { all, call, put, takeLatest } from "redux-saga/effects"
import cityApi from "../../api/cityApi";
import studentApi from "../../api/studentApi";
import { City, ListRespone, Student } from "../../models";
import { dashboardActions, RankingByCity } from "./dashBoardSlice"

function* fetchStatistics() {
    const responeList: Array<ListRespone<Student>> = yield all([
        call(studentApi.getAll, { _limit: 1, _page: 1, gender: 'male' }),
        call(studentApi.getAll, { _limit: 1, _page: 1, gender: 'female' }),
        call(studentApi.getAll, { _limit: 1, _page: 1, mark_gte: 8 }),
        call(studentApi.getAll, { _limit: 1, _page: 1, mark_lte: 5 }),

    ]);
    const statistics = responeList.map(x => x.pagination._totalRows);
    const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statistics;
    yield put(dashboardActions.setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount }));

};

function* fetchHighestStudent() {
    const { data } = yield call(studentApi.getAll, { _page: 1, _limit: 5, _sort: 'mark', _order: 'desc' });
    yield put(dashboardActions.setHighestStudent(data));
};
function* fetchLowestStudent() {
    const { data } = yield call(studentApi.getAll, { _page: 1, _limit: 5, _sort: 'mark', _order: 'asc' });
    yield put(dashboardActions.setLowestStuden(data));
};
function* fetchRankingCity() {
    const cityList: Array<City> = yield call(cityApi.getAll);
    const studentListByCity: Array<ListRespone<Student>> = yield all(cityList.map(x =>
        call(studentApi.getAll, {
            _page: 1,
            _limit: 5,
            _sort: 'mark',
            _order: 'desc',
            city: x.code
        })

    ));
    console.log(studentListByCity)
    const rankingCityList: Array<RankingByCity> = studentListByCity.map((x, index) => ({

        cityId: cityList[index].code,
        cityName: cityList[index].name,
        rankingList: x.data,

    }));
    yield put(dashboardActions.setRankingByCity(rankingCityList))


};


function* fetchDashboardSaga() {
    try {

        yield all([fetchStatistics(), fetchHighestStudent(), fetchLowestStudent(), fetchRankingCity()]);
        yield put(dashboardActions.fetchDataSuccess())

    }
    catch (e) {
        yield put(dashboardActions.fetchDataFailed());
    }

}

function* dashboardSaga() {
    yield takeLatest(dashboardActions.fetchData.type, fetchDashboardSaga);
}
export default dashboardSaga;