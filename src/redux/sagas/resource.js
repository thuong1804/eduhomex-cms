import apiConfig from "@/constants/apiConfig";
import { resourceActionsTypes } from "../actions";
import { processCallbackAction } from "../helper";
import { takeLatest } from "redux-saga/effects";

const {
    GET_LIST,
} = resourceActionsTypes;

const getList = (action) => {
    return processCallbackAction(apiConfig.resource.getList, action);
}

const areaSagas = [
    takeLatest(GET_LIST, getList),
];

export default areaSagas;
