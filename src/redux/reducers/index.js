import { combineReducers } from "redux";

import loading from "./loading";
import account from "./account";
import common from "./common";
import area from "./area";

const rootReducer = combineReducers({
    loading,
    account,
    common,
    area,
});
export default rootReducer;
