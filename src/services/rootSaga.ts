import { all, fork } from "redux-saga/effects";
import { addUserSaga, fetchUsersSaga, updateUserSaga } from "./sagas/userSaga";

const rootSaga = function* () {
  yield all([
    fork(fetchUsersSaga),
    fork(addUserSaga),
    fork(updateUserSaga),
  ]);
};

export default rootSaga;