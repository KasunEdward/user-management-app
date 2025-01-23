import { call, put, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { fetchStatsFailure, fetchStatsRequest, fetchStatsSuccess } from "../slices/statsSlice";
import { fetchStatsApi } from "../apis/statsApi";

function* fetchStats(): SagaIterator {
  try {
    const response = yield call(fetchStatsApi);

    yield put(fetchStatsSuccess({ stats: response.data}));
  } catch (error:any) {
    yield put(fetchStatsFailure(error.message));
  }
}

export function* fetchStatsSaga() {
  yield takeLatest(
    fetchStatsRequest.type,
    fetchStats
  );
}
