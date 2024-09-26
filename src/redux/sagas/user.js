import { takeLatest } from 'redux-saga/effects';

import { userActionTypes } from '@/redux/actions';
import apiConfig from '@/constants/apiConfig';

import { processCallbackAction } from '../helper';

const {
    GET_LIST,
    GET_DETAIL,
    CREATE,
    UPDATE,
    DELETE,
    UPDATE_STATUS,
    GET_PROVINCES,
} = userActionTypes;

const getList = (action) => {
    return processCallbackAction(apiConfig.user.getList, action);
}

const getDetail = ({ payload }) => {
    const { params, onCompleted, onError } = payload;
    const apiOptions = {
        ...apiConfig.user.getDetail,
        path: apiConfig.user.getDetail.path.replace(':id', params.id)
    }
    return processCallbackAction(apiOptions, { payload: { params: {}, onCompleted, onError }});
}

const create = (action) => {
    return processCallbackAction(apiConfig.user.create, action);
}

const update = (action) => {
    return processCallbackAction(apiConfig.user.update, action);
}

const deleteTeacher = ({ payload }) => {
    const { params, onCompleted, onError } = payload;
    const apiOptions = {
        ...apiConfig.user.delete,
        path: apiConfig.user.delete.path.replace(':id', params.id)
    }
    return processCallbackAction(apiOptions, { payload: { params: {}, onCompleted, onError }});
}

const updateStatus = (action) => {
    return processCallbackAction(apiConfig.user.updateStatus, action);
}

const getProvinces = (action) => {
    return processCallbackAction(apiConfig.user.getProvinces, action);
}

const userSagas = [
    takeLatest(GET_LIST, getList),
    takeLatest(CREATE, create),
    takeLatest(GET_DETAIL, getDetail),
    takeLatest(UPDATE, update),
    takeLatest(DELETE, deleteTeacher),
    takeLatest(UPDATE_STATUS, updateStatus),
    takeLatest(GET_PROVINCES, getProvinces),
];

export default userSagas;