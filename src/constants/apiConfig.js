import { cmsApiUrl, essoApiUrl, integrationApiUrl } from "@/constants";

const baseHeader = {
    "Content-Type": "application/json",
};

const multipartFormHeader = {
    "Content-Type": "multipart/form-data",
};

const apiConfig = {
    account: {
        getProfile: {
            path: `${essoApiUrl}/account/profile`,
            method: "GET",
            headers: baseHeader,
            authorizationType: "Bearer",
        },
        updateProfile: {
            path: `${essoApiUrl}/account/update-profile`,
            method: "PUT",
            headers: baseHeader,
            authorizationType: "Bearer",
        },
        refreshToken: {
            path: `${essoApiUrl}/auth/refresh-token`,
            method: "POST",
            headers: baseHeader,
            isPublic: true,
        },
        changePassword: {
            path: `${essoApiUrl}/account/change-password`,
            method: "PUT",
            headers: baseHeader,
            authorizationType: "Bearer",
        },
        logout: {
            path: `${essoApiUrl}/account/logout`,
            method: "POST",
            headers: baseHeader,
            authorizationType: "Bearer",
        },
    },
    user: {
        getDetail: {
            path: `${cmsApiUrl}/user/:id`,
            method: "GET",
            headers: baseHeader,
        },
        create: {
            path: `${cmsApiUrl}/user`,
            method: "POST",
            headers: baseHeader,
        },
        update: {
            path: `${cmsApiUrl}/user`,
            method: "PUT",
            headers: baseHeader,
        },
        delete: {
            path: `${cmsApiUrl}/user/:id`,
            method: "DELETE",
            headers: baseHeader,
        },
        updateStatus: {
            path: `${cmsApiUrl}/user/update-status`,
            method: "PUT",
            headers: baseHeader,
        },
    },
    area: {
        path: `${integrationApiUrl}/integration/areas`,
        method: "GET",
        headers: baseHeader,
    },
    resource: {
        getList: {
            path: `${cmsApiUrl}/cms/resources/eduhome-resources`,
            method: "GET",
            headers: baseHeader,
        },
    }
};

export default apiConfig;
