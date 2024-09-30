import {
    commonStatus,
    currencyTypes,
    userRoles,
    typeScope,
    APPS,
    skillTypes,
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

export const skillDDL = [
    { value: skillTypes.PR, label: 'Pronunciation' },
    { value: skillTypes.VO, label: 'Vocab' },
    { value: skillTypes.GR, label: 'Grammar' },
    { value: skillTypes.RE, label: 'Reading' },
    { value: skillTypes.WR, label: 'Writing' },
    { value: skillTypes.LI, label: 'Listening' },
    { value: skillTypes.SP, label: 'Speaking' },
]

export const skillThumbnails = {
    [skillTypes.GR]: '/images/skills/clt-grammar-green.png',
    [skillTypes.LI]: '/images/skills/clt-listening-green.png',
    [skillTypes.PR]: '/images/skills/clt-pronunciation-green.png',
    [skillTypes.RE]: '/images/skills/clt-reading-green.png',
    [skillTypes.SP]: '/images/skills/clt-speaking-green.png',
    [skillTypes.VO]: '/images/skills/clt-vocab-green.png',
    [skillTypes.WR]: '/images/skills/clt-writing-green.png',
}