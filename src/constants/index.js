export const cmsApiUrl = process.env.REACT_APP_CMS_API;
export const essoApiUrl = process.env.REACT_APP_ESSO_API;
export const itestApiUrl = process.env.REACT_APP_ITEST_API;


export const integrationApiUrl = process.env.REACT_APP_INTEGRATION_API;
export const ESSO_CLIENT_APP_ID = process.env.REACT_APP_ESSO_CLIENT_APP_ID;

export const LOGIN_URL = process.env.REACT_APP_LOGIN_URL;
export const IMAGE_URL = process.env.REACT_APP_CDN_IMAGE_URL;
export const DEFAULT_TABLE_ITEM_SIZE = 10;

// Datetime format
export const DATE_FORMAT_DISPLAY = "DD/MM/YYYY";
export const DATE_FORMAT_VALUE = "YYYY-MM-DD";
export const DATETIME_FORMAT_VALUE = "YYYY-MM-DD HH:mm:ss";
export const DATETIME_FORMAT_DISPLAY = "DD/MM/YYYY HH:mm";

export const storageKeys = {
    ACCESS_TOKEN: process.env.REACT_APP_ACCESS_TOKEN_KEY,
    REFRESH_TOKEN: process.env.REACT_APP_REFRESH_TOKEN_KEY,
    USER_ROLE: "user-role",
};

export const fieldTypes = {
    TEXT: "TEXT",
    NUMBER: "NUMBER",
    SELECT: "SELECT",
    AUTOCOMPLETE: "AUTOCOMPLETE",
    DATE: "DATE",
    UPLOAD: "UPLOAD",
    RADIO: "RADIO",
    BOOLEAN: "BOOLEAN",
    CHECKBOX: "CHECKBOX",
};

export const commonStatus = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    LOCK: "LOCK",
};

export const typeEduhome = {
    DHA: 'DHA',
    DCR: 'DCR',
    EWB: 'EWB',
}

export const userRoles = {
    ADMIN: "ADMIN",
    DTP_ADMIN: "DTP_ADMIN",
    TEACHER: "TEACHER",
    STUDENT: "STUDENT",
};

export const currencyTypes = {
    VND: "VND",
};

export const bookTypes = {
    BOOK: 'BOOK',
    SUPPLEMENTARY: 'SUPPLEMENTARY',
    EXTERNAL: 'EXTERNAL',
    INTERNAL: 'INTERNAL',
}

export const typeScope = {
    SYSTEM: "SYSTEM",
    USER: "USER",
};

export const RESOURCE_TYPES = {
    APP: "APP",
    SUPPLEMENTARY: "SUPPLEMENTARY",
    SERIES: "SERIES",
    UNIT_TEST: "UNIT_TEST",
};

export const APPS = {
    ITEST: "ITEST",
    EDUHOME: "EDUHOME",
    EDUFUN: "EDUFUN",
};

export const CHECKED_STRATEGY_TYPES = {
    SHOW_PARENT: "SHOW_PARENT",
    SHOW_ALL: "SHOW_ALL",
    SHOW_CHILD: "SHOW_CHILD",
};

export const PAGE_SIZE_OPTIONS = [10, 20, 50];
export const phoneRegExp = /^0([35789]([0-9]{8}))$/;

export const passwordRegex =
    /^[-a-zA-Z0-9-~!@#$%^&*()+/?\\_`=;:"'><.,|{}[\]]+(\s+[-a-zA-Z0-9-~!@#$%^&*()+/?\\_`=;:"'><.,|{}[\]]+)*$/;
export const whiteSpaceRegex = /^[^\s]+(\s+[^\s]+)*$/g;
export const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
export const regexCodeSubjectSystem = /^[a-zA-Z0-9_-]+$/i

