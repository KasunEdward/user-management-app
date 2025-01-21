import { all, fork } from "redux-saga/effects";
import { addUserSaga, deleteUserSaga, fetchUsersSaga, updateUserSaga } from "./sagas/userSaga";

const rootSaga = function* () {
  yield all([
    fork(fetchUsersSaga),
    fork(addUserSaga),
    fork(updateUserSaga),
    fork(deleteUserSaga),
  ]);
};

export default rootSaga;