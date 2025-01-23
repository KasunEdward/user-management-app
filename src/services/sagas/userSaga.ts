import { call, put, takeLatest } from "redux-saga/effects";
import { addUserApi, deleteUserApi, fetchUsersApi, updateUserApi } from "../apis/userApi";

import { SagaIterator } from "redux-saga";
import { addUserFailure, addUserRequest, addUserSuccess, deleteUserFailure, deleteUserRequest, deleteUserSuccess, fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess, updateUserFailure, updateUserRequest, updateUserSuccess } from "../slices/userSlice";

function* fetchUsers(action: ReturnType<typeof fetchUsersRequest>): SagaIterator {
  const { start = 0, limit = 100 } = action.payload || {};
  try {
    const response = yield call(fetchUsersApi, { start, limit });
    const total = response.data.length;

    yield put(fetchUsersSuccess({ users: response.data, total }));
  } catch (error:any) {
    yield put(fetchUsersFailure(error.message));
  }
}

function* addUser(action: ReturnType<typeof addUserRequest>): SagaIterator {
  try {
    const response = yield call(addUserApi, action.payload);
    yield put(addUserSuccess(response.data));
  } catch (error:any) {
    yield put(addUserFailure(error.message));
  }
}

function* updateUser(action: ReturnType<typeof updateUserRequest>): SagaIterator {
  try {
    const response = yield call(updateUserApi, action.payload);
    yield put(updateUserSuccess(response.data));
  } catch (error:any) {
    yield put(updateUserFailure(error.message));
  }
}

function* deleteUser(action: ReturnType<typeof deleteUserRequest>): SagaIterator {
  try {
    const response = yield call(deleteUserApi, action.payload);
    yield put(deleteUserSuccess(response.data));
  } catch (error:any) {
    yield put(deleteUserFailure(error.message));
  }
}

export function* fetchUsersSaga() {
  yield takeLatest(
    fetchUsersRequest.type,
    fetchUsers
  );
}
export function* addUserSaga() {
  yield takeLatest(
    addUserRequest.type,
    addUser
  );
}
export function* updateUserSaga() {
  yield takeLatest(
    updateUserRequest.type,
    updateUser
  );
}
export function* deleteUserSaga() {
  yield takeLatest(
    deleteUserRequest.type,
    deleteUser
  );
}