import { all } from 'redux-saga/effects';

import account from './account';
import user from "./user";
import area from "./area";
import resource from "./resource";

const sagas = [
    ...account,
    ...user,
    ...area,
    ...resource
];

function* rootSaga() {
    yield all(sagas);
}

export default rootSaga;