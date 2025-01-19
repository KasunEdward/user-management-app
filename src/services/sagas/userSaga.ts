import { call, put, takeLatest } from "redux-saga/effects";
import { fetchUsersApi } from "../apis/userApi";

import { SagaIterator } from "redux-saga";
import { fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess } from "../slices/userSlice";

function* fetchUsers(action: ReturnType<typeof fetchUsersRequest>): SagaIterator {
  const { start = 0, limit = 100 } = action.payload || {};
  try {
    const response = yield call(fetchUsersApi, start, limit);
    const total = response.data.length;
    // console.log(response.data);

    yield put(fetchUsersSuccess({ users: response.data, total }));
  } catch (error:any) {
    yield put(fetchUsersFailure(error.message));
  }
}

export function* fetchUsersSaga() {
  yield takeLatest(
    fetchUsersRequest.type,
    fetchUsers
  );
}