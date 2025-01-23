import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userSlice from './slices/userSlice';
import statsSlice from './slices/statsSlice';
import rootSaga from './rootSaga';


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    users: userSlice,
    stats:statsSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

