import { call, put, select, take } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';

import { accountActions, accountActionTypes, loadingActions } from '@/redux/actions';
import { sendRequest, handleApiResponse } from '@/utils/api';
import { storageKeys } from '@/constants';
import { getCookie } from '@/utils/localStorage';
import apiConfig from '@/constants/apiConfig';

const { startLoading, finishLoading } = loadingActions;

export const createSuccessActionType = (type) => `${type}_SUCCESS`;
export const createFailureActionType = (type) => `${type}_FAILURE`;

function* sendRequestWithRefreshToken(options, params) {
    let canSendRequest = true;
    if (!options.isPublic) {
        const accessToken = getCookie(storageKeys.ACCESS_TOKEN);
        const refreshToken = getCookie(storageKeys.REFRESH_TOKEN);

        if (accessToken && refreshToken) {
            let accessTokenExpiredTime = 0;
            try {
                const jwtData = jwtDecode(accessToken);
                accessTokenExpiredTime = (jwtData?.exp || 0) * 1000;
            }
            catch (ex) {
                console.log(ex)
            }

            if (accessTokenExpiredTime < new Date().getTime()) {
                const { isRefreshingToken } = yield select(state => state.account);
                if (isRefreshingToken) {
                    yield take(accountActionTypes.UPDATE_TOKEN);
                }
                else {
                    yield put(accountActions.refreshingToken(true));
                    try {
                        const refreshResponse = yield call(sendRequest, apiConfig.account.refreshToken, { refreshToken });
                        yield put(accountActions.refreshToken(false));

                        const newAccessToken = refreshResponse?.responseData?.data?.token;
                        const newRefreshToken = refreshResponse?.responseData?.data?.refreshToken;
                        const newExpirationInMs = refreshResponse?.responseData?.data?.expirationInMs;

                        if (refreshResponse?.success && newAccessToken && newRefreshToken && newExpirationInMs) {
                            yield put(accountActions.updateToken({ accessToken: newAccessToken, refreshToken: newRefreshToken, expirationInMs: newExpirationInMs }));
                        }
                        else {
                            canSendRequest = false;
                        }
                    }
                    catch {
                        canSendRequest = false;
                    }
                }
            }
        }
        else {
            canSendRequest = false;
        }
    }

    if (canSendRequest) {
        const response = yield call(sendRequest, options, params);
        if (response?.isLogout) {
            yield put(accountActions.removeToken());
            return null;
        }
        return response;
    }
    else {
        yield put(accountActions.removeToken());
        return null;
    }
}

export function* processLoadingAction(options, { payload, type }) {
    const SUCCESS = createSuccessActionType(type);
    const FAILURE = createFailureActionType(type);
    yield put(startLoading(type));
    try {
        const response = yield* sendRequestWithRefreshToken(options, payload);
        yield put({
            type: response?.success ? SUCCESS : FAILURE,
            payload: response?.responseData
        });
    } catch (e) {
        console.log(e);
        yield put({
            type: FAILURE,
            payload: e,
            error: true
        });
    }
    yield put(finishLoading(type));
}

// export function* processAction(options, { payload, type }) {
//     const SUCCESS = createSuccessActionType(type);
//     const FAILURE = createFailureActionType(type);
//     try {
//         const response = yield call(sendRequest, options, payload);

//         yield put({
//             type: response.success ? SUCCESS : FAILURE,
//             payload: response.responseData
//         });
//     } catch (e) {
//         console.error(e);
//         yield put({
//             type: FAILURE,
//             payload: e,
//             error: true
//         });
//     }
//     if (loading) {
//         yield put(finishLoading(type));
//     }
// }

export function* processCallbackAction(options, { payload }) {
    const { params, onCompleted, onError } = payload;
    try {
        const result = yield* sendRequestWithRefreshToken(options, params);
        handleApiResponse(result, onCompleted, onError);
    } catch (error) {
        console.log(error);
        onError(error);
    }
}

