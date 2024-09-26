import { createAction } from "redux-actions";

export const actionTypes = {
    GET_PROVINCES: "area/GET_PROVINCES",
    GET_DISTRICTS: "area/GET_DISTRICTS",
    GET_WARDS: "area/GET_WARDS",
};

export const actions = {
    getProvinces: createAction(actionTypes.GET_PROVINCES),
    getDistricts: createAction(actionTypes.GET_DISTRICTS),
    getWards: createAction(actionTypes.GET_WARDS),
};
