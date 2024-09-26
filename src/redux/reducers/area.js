import { handleActions } from "redux-actions";
import { areaActionTypes } from "../actions";
import { createSuccessActionType } from "../helper";

const { GET_DISTRICTS, GET_PROVINCES, GET_WARDS } = areaActionTypes;

const initialState = {
    provinces: [],
    districts: [],
    wards: [],
};

const area = handleActions(
    {
        [createSuccessActionType(GET_PROVINCES)]: (state, action) => {
            return {
                ...state,
                provinces: action.payload.data,
            };
        },
        [createSuccessActionType(GET_DISTRICTS)]: (state, action) => {
            return {
                ...state,
                districts: action.payload.data,
            };
        },
        [createSuccessActionType(GET_WARDS)]: (state, action) => {
            return {
                ...state,
                wards: action.payload.data,
            };
        },
    },
    initialState
);

export default area;
