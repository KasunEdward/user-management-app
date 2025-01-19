import { all, fork } from "redux-saga/effects";
import { fetchUsersSaga } from "./sagas/userSaga";

const rootSaga = function* () {
  yield all([
    fork(fetchUsersSaga),
  ]);
};

export default rootSaga;