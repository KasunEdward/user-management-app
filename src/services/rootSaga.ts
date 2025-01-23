import { all, fork } from "redux-saga/effects";
import { addUserSaga, deleteUserSaga, fetchUsersSaga, updateUserSaga } from "./sagas/userSaga";
import { fetchStatsSaga } from "./sagas/statsSaga";

const rootSaga = function* () {
  yield all([
    fork(fetchUsersSaga),
    fork(addUserSaga),
    fork(updateUserSaga),
    fork(deleteUserSaga),
    fork(fetchStatsSaga),
  ]);
};

export default rootSaga;