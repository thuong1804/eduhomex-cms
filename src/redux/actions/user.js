import { createAction } from 'redux-actions';

export const actionTypes = {
    GET_LIST: 'user/GET_LIST',
    GET_DETAIL: 'user/GET_DETAIL',
    CREATE: 'user/CREATE',
    UPDATE: 'user/UPDATE',
    DELETE: 'user/DELETE',
    UPDATE_STATUS: 'user/UPDATE_STATUS',
    GET_PROVINCES: 'user/GET_PROVINCES',
}

export const actions = {
    getList: createAction(actionTypes.GET_LIST),
    getDetail: createAction(actionTypes.GET_DETAIL),
    create: createAction(actionTypes.CREATE),
    update: createAction(actionTypes.UPDATE),
    delete: createAction(actionTypes.DELETE),
    updateStatus: createAction(actionTypes.UPDATE_STATUS),
    getProvinces: createAction(actionTypes.GET_PROVINCES),
}

