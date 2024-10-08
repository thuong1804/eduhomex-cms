import qs from 'query-string';
import {  ESSO_CLIENT_APP_ID, storageKeys } from '@/constants';
import { getCookie } from './localStorage';

const RESPONSE_TYPE_FILE = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

function objectToFormData(obj, formData = new FormData(), parentKey = "") {
    for (const key in obj) {
        const keyName = parentKey ? (Array.isArray(obj) ? parentKey : `${parentKey}.${key}`) : key;
        if (typeof obj[key] === "object" && !(obj[key] instanceof File)) {
            const arrayKey = parentKey ? `${parentKey}[${key}]` : key;
            objectToFormData(obj[key], formData, arrayKey);
        } else {
            formData.append(keyName, obj[key]);
        }
    }

    return formData;
}


const sendRequest = async (options, params = {}) => {
    const headers = { ...options.headers };
    let fullPath = options.path;
    let fetchRequest;
    let infoRequest;
    // const errorPath = window.location.protocol + '//' + window.location.host + '/error';
    const userToken = getCookie(storageKeys.ACCESS_TOKEN);

    if (!options.isPublic && userToken) {
        headers.Authorization = `${options.authorizationType  || "E-Token"} ${userToken}`;
        headers.ClientAppId = options.clientAppId || ESSO_CLIENT_APP_ID;
    }

    // replace path params
    for (let key of Object.keys(params || {})) {
        const keyCompare = `/:${key}`;
        if (fullPath.indexOf(keyCompare) !== -1) {
            fullPath = fullPath.replace(keyCompare, params[key]);
        }
    }

    if (headers['Content-Type'] === 'multipart/form-data') {
        const formData = objectToFormData(params)

        delete headers['Content-Type'];

        infoRequest = {
            method: options.method,
            headers,
            body: formData,
        };
    } else {
        if (options.method === 'GET') {
            let hasDefaultQuery = false;
            if (options.params && Object.keys(options.params).length > 0) {
                hasDefaultQuery = true;
                const defaultQuery = qs.stringify(options.params);
                fullPath = `${fullPath}?${defaultQuery}`;
            }
            if (Object.keys(params).length > 0) {
                const queryString = qs.stringify(params);
                fullPath = hasDefaultQuery ? `${fullPath}&${queryString}` : `${fullPath}${fullPath.includes('?') ? '&' : '?'}${queryString}`;
            }

            infoRequest = {
                method: options.method,
                headers,
            };
        } else {
            infoRequest = {
                method: options.method,
                headers,
                body: JSON.stringify(params)
            };
        }
    }

    // console.log("infoRequest Api:",infoRequest);
    fetchRequest = await fetch(fullPath, infoRequest)
        .catch(error => {
            console.log('error', error);
            return Promise.reject(error);
            // Redirect to error page
            // window.location.replace(errorPath);
        });

    if (fetchRequest.status === 401 && !options.isPublic) {
        return { isLogout: true };
    }
    else if (fetchRequest.status === 403) {
        window.location.replace('/forbidden');
    }
    else if (fetchRequest.status === 200 || fetchRequest.status === 201) {
        const responseContentType =  fetchRequest.headers.get('content-type');
        const responseData = RESPONSE_TYPE_FILE.includes(responseContentType) ? await fetchRequest.blob() : await fetchRequest.json();
        return { success: true, responseData }
    }
    else if (fetchRequest.status === 401 || fetchRequest.status === 400 || fetchRequest.status === 404) {
        const responseData = await fetchRequest.json();
        return { success: false, responseData }
    }
    else {
        return Promise.reject(new Error('Internal Server Error'));
    }
}

const handleApiResponse = (result, onCompleted, onError) => {
    const { success, responseData } = result || {};
    if (success)
        onCompleted(responseData);
    else
        onError(responseData);
}

export { sendRequest, handleApiResponse }