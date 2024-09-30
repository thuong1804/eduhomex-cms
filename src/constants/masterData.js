import {
    commonStatus,
    currencyTypes,
    userRoles,
    typeScope,
    APPS,
    typeEduhome,
} from ".";

export const statusDDL = [
    { value: commonStatus.ACTIVE, label: 'Hoạt động' },
    { value: commonStatus.LOCK, label: 'Ngưng hoạt động' },
];

export const eduhomeTypeDDL = [
    { value: typeEduhome.DHA, label: "DHA" },
    { value: typeEduhome.DCR, label: "DCR" },
    { value: typeEduhome.EWB, label: "Online Workbook" },
]

export const currencyOptions = [{ value: currencyTypes.VND, label: "VNĐ" }];

export const rolesDDL = [
    { value: 2, code: userRoles.TEACHER, label: "Giáo viên" },
    { value: 0, code: userRoles.ADMIN, label: "Admin" },
    { value: 4, code: userRoles.STUDENT, label: "Học viên" },
];

export const scope = [
    { value: typeScope.SYSTEM, label: "Hệ thống" },
    { value: typeScope.USER, label: "Người dùng" },
];

export const appsDDL = [
    { value: APPS.ITEST, label: "i-Test" },
    { value: APPS.EDUHOME, label: "Eduhome" },
    { value: APPS.EDUFUN, label: "Edufun" },
];
