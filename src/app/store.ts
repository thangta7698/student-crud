import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/Auth/authSlice';
import dashboardReducer from '../features/dashboard/dashBoardSlice';
import studentReducer from '../features/student/studentSlice';
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import { history } from '../ultils/'
import mySaga from './saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
const rootReducer = combineReducers({
  router: connectRouter(history),
  counter: counterReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  student: studentReducer,

});
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),

});
sagaMiddleware.run(mySaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
