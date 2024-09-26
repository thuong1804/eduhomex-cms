import apiConfig from "@/constants/apiConfig";
import { areaActionTypes } from "../actions";
import { processCallbackAction, processLoadingAction } from "../helper";
import { takeLatest } from "redux-saga/effects";

const { GET_DISTRICTS, GET_PROVINCES, GET_WARDS } = areaActionTypes;

const getProvinces = (action) => {
    const { onCompleted } = action.payload || {};
    if (onCompleted) {
        return processCallbackAction(apiConfig.area, action);
    } else {
        return processLoadingAction(apiConfig.area, action);
    }
};

const getDistricts = (action) => {
    const { onCompleted } = action.payload;
    if (onCompleted) {
        return processCallbackAction(apiConfig.area, action);
    } else {
        return processLoadingAction(apiConfig.area, action);
    }
};

const getWards = (action) => {
    const { onCompleted } = action.payload;
    if (onCompleted) {
        return processCallbackAction(apiConfig.area, action);
    } else {
        return processLoadingAction(apiConfig.area, action);
    }
};

const areaSagas = [
    takeLatest(GET_PROVINCES, getProvinces),
    takeLatest(GET_DISTRICTS, getDistricts),
    takeLatest(GET_WARDS, getWards),
];

export default areaSagas;
