import { all } from 'redux-saga/effects';

import account from './account';
import user from "./user";
import area from "./area";

const sagas = [
    ...account,
    ...user,
    ...area,
];

function* rootSaga() {
    yield all(sagas);
}

export default rootSaga;