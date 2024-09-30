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

export const sourceType = {
    DTP: 'DTP',
    MOET: 'MOET'
}

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

export const CATEGORY_TEST = [
    {
        value: 'Đề thi theo sách',
        title: 'Đề thi theo sách',
        children: [
            {
                value: 'Sách giáo khoa',
                title: 'Sách giáo khoa',

            },
            {
                value: 'Giáo trình',
                title: 'Giáo trình',
            }
        ]
    },
    {
        value: 'parent-1',
        title: 'Bài thi quốc tế',
        children: [
            {
                value: 'CAMBRIDGE',
                title: 'Cambridge',
                children: [
                    {
                        value: 'CAMBRIDGE_YOUNG_LEARNERS',
                        title: 'Young Learners',
                        children: [
                            {
                                value: 11,
                                title: 'Pre-A1 Starters',
                            },
                            {
                                value: 12,
                                title: 'A1 Movers',
                            },
                            {
                                value: 13,
                                title: 'A2 Flyers',
                            },
                        ],
                    },
                    {
                        value: 'CAMBRIDGE_A2_KEYS',
                        title: 'A2 Key',
                        children: [
                            {
                                value: 14,
                                title: 'A2 Key for Schools',
                            },
                            {
                                value: 15,
                                title: 'A2 Key',
                            },
                        ],
                    },
                    {
                        value: 'CAMBRIDGE_B1_PRELIMINARY',
                        title: 'B1 Preliminary',
                        children: [
                            {
                                value: 16,
                                title: 'B1 Preliminary for Schools',
                            },
                            {
                                value: 17,
                                title: 'B1 Preliminary',
                            },
                            {
                                value: 54,
                                title: 'B2 First',
                            },
                            {
                                value: 55,
                                title: 'C1 Advanced',
                            },
                            {
                                value: 56,
                                title: 'C2 Proficiencyy',
                            },
                        ],
                    },
                ]
            },
            {
                value: 'IELTS',
                title: 'IELTS',
                children: [
                    {
                        value: 18,
                        title: 'Pre-IELTS 3.0-3.5',
                    },
                    {
                        value: 19,
                        title: 'IELTS Academic 4.0-5.5',
                    },
                    {
                        value: 28,
                        title: 'IELTS Academic 5.0-6.5',
                    },
                    {
                        value: 46,
                        title: 'IELTS Academic 7.0-8.0',
                    },
                    {
                        value: 47,
                        title: 'IELTS Academic 8.0-9.0',
                    },
                ],
            },
            {
                value: 'APTIS',
                title: 'APTIS',
                children: [
                    {
                        value: 20,
                        title: 'APTIS General Reading & Listening',
                    },
                    {
                        value: 21,
                        title: 'APTIS General Grammar & Vocabulary',
                    },
                ],
            },
            {
                value: 'TOEFL',
                title: 'TOEFL',
                children: [
                    {
                        value: 57,
                        title: 'TOEFL - Primary',
                    },
                    {
                        value: 23,
                        title: 'TOEFL - Junior',
                    },
                    {
                        value: 22,
                        title: 'TOEFL iBT 42-94',
                    },
                    {
                        value: 24,
                        title: 'TOEFL iBT 95-120',
                    },
                    {
                        value: 25,
                        title: 'TOEFL - iTP',
                    },
                ],
            },
            {
                value: 'TOEIC',
                title: 'TOEIC',
                children: [
                    {
                        value: 48,
                        title: 'TOEIC 120-220',
                    },
                    {
                        value: 49,
                        title: 'TOEIC 225-545',
                    },
                    {
                        value: 26,
                        title: 'TOEIC 550-750',
                    },
                    {
                        value: 27,
                        title: 'TOEIC 650-900',
                    },
                    {
                        value: 50,
                        title: 'TOEIC 945-990',
                    },
                ],
            },
        ]
    },
    {
        value: 'Bài thi trong nước',
        title: 'Bài thi trong nước',
        children: [
            {
                value: 'Tuyển sinh lớp 10',
                title: 'Tuyển sinh lớp 10',

            },
            {
                value: 'Tốt nghiệp THPT',
                title: 'Tốt nghiệp THPT',
            },
            {
                value: 'Đánh giá năng lực',
                title: 'Đánh giá năng lực',
            },
            {
                value: 'VSTEP',
                title: 'VSTEP',
            }
        ]
    },


]

export const UNIT_TEST_INTERIOR = [
    {
        code: "PRACTICE",
        label: "Thực hành",
        options: [
            {
                value: 1,
                group: "PRACTICE",
                code: "PRACTICE_UNIT_TEST",
                label: "Theo đơn vị bài học",
            },
            {
                value: 2,
                group: "PRACTICE",
                code: "PRACTICE_LANGUAGE",
                label: "Theo chuyên đề",
            },
            {
                value: 3,
                group: "PRACTICE",
                code: "PRACTICE_SKILL",
                label: "Theo kỹ năng",
            },
        ],
    },
    {
        code: "EXAM",
        label: "Kiểm tra",
        options: [
            {
                value: 4,
                group: "EXAM",
                code: "EXAM_15",
                label: "Kiểm tra thường xuyên",
            },
            {
                value: 6,
                group: "EXAM",
                code: "EXAM_MID_TERM",
                label: "Kiểm tra giữa kỳ",
            },
            {
                value: 7,
                group: "EXAM",
                code: "EXAM_END_OF_TERM",
                label: "Kiểm tra cuối kỳ",
            },
        ],
    },
];

export const UT_NATIONAL_EXAM = [
    {
        value: 8,
        group: "NATIONAL_EXAM",
        code: "FOCUS_GOOD_STUDENT",
        label: "Tuyển sinh lớp 10",
    },
    {
        value: 9,
        group: "NATIONAL_EXAM",
        code: "FOCUS_SUPPLEMENT",
        label: "Đánh giá năng lực",
    },
    {
        value: 10,
        group: "NATIONAL_EXAM",
        code: "FOCUS_REINFORCE",
        label: "Tốt nghiệp THPT",
    },
    {
        code: "VSTEP",
        label: "VSTEP",
        options: [
            {
                value: 45,
                group: "NATIONAL_EXAM",
                code: "VSTEP_A1",
                label: "A1 (Bậc 1)",
            },
            {
                value: 29,
                group: "NATIONAL_EXAM",
                code: "VSTEP_A2",
                label: "A2 (Bậc 2)",
            },
            {
                value: 30,
                group: "NATIONAL_EXAM",
                code: "VSTEP_B1",
                label: "B1 (Bậc 3)",
            },
            {
                value: 31,
                group: "NATIONAL_EXAM",
                code: "VSTEP_B2",
                label: "B2 (Bậc 4)",
            },
            {
                value: 32,
                group: "NATIONAL_EXAM",
                code: "VSTEP_C1",
                label: "C1 (Bậc 5)",
            },
        ],
    },
];

export const UT_CERT_CAMBRIDGE = {
    code: "CAMBRIDGE",
    label: "Cambridge",
    options: [
        {
            code: "CAMBRIDGE_YOUNG_LEARNERS",
            label: "Young Learners",
            options: [
                {
                    value: 11,
                    group: "CAMBRIDGE_YOUNG_LEARNERS",
                    code: "PRE_A1",
                    label: "Pre-A1 Starters",
                },
                {
                    value: 12,
                    group: "CAMBRIDGE_YOUNG_LEARNERS",
                    code: "A1_MOVERS",
                    label: "A1 Movers",
                },
                {
                    value: 13,
                    group: "CAMBRIDGE_YOUNG_LEARNERS",
                    code: "A2_FLYERS",
                    label: "A2 Flyers",
                },
            ],
        },
        {
            code: "CAMBRIDGE_A2_KEYS",
            label: "A2 Key",
            options: [
                {
                    value: 14,
                    group: "CAMBRIDGE_A2_KEYS",
                    code: "FOR_SCHOOL",
                    label: "A2 Key for Schools",
                },
                {
                    value: 15,
                    group: "CAMBRIDGE_A2_KEYS",
                    code: "GENERAL",
                    label: "A2 Key",
                },
            ],
        },
        {
            code: "CAMBRIDGE_B1_PRELIMINARY",
            label: "B1 Preliminary",
            options: [
                {
                    value: 16,
                    group: "CAMBRIDGE_B1_PRELIMINARY",
                    code: "FOR_SCHOOL",
                    label: "B1 Preliminary for Schools",
                },
                {
                    value: 17,
                    group: "CAMBRIDGE_B1_PRELIMINARY",
                    code: "GENERAL",
                    label: "B1 Preliminary",
                },
                {
                    value: 54,
                    group: "CAMBRIDGE_B1_PRELIMINARY",
                    code: "GENERAL",
                    label: " B2 First ",
                },
                {
                    value: 55,
                    group: "CAMBRIDGE_B1_PRELIMINARY",
                    code: "GENERAL",
                    label: "C1 Advanced",
                },
                {
                    value: 56,
                    group: "CAMBRIDGE_B1_PRELIMINARY",
                    code: "GENERAL",
                    label: "C2 Proficiency",
                },
            ],
        },
    ],
};

export const UT_CERT_IELTS = {
    code: "IELTS",
    label: "IELTS",
    options: [
        {
            value: 18,
            group: "IELTS",
            code: "GENERAL",
            label: "Pre-IELTS 3.0-3.5",
        },
        {
            value: 19,
            group: "IELTS",
            code: "ACADEMIC",
            label: "IELTS Academic 4.0-5.5",
        },
        {
            value: 28,
            group: "IELTS",
            code: "ACADEMIC5PLUS",
            label: "IELTS Academic 5.0-6.5 (5.5-6.5)",
        },
        {
            value: 46,
            group: "IELTS",
            code: "ACADEMIC7PLUS",
            label: "IELTS Academic 7.0-8.0",
        },
        {
            value: 47,
            group: "IELTS",
            code: "ACADEMIC8PLUS",
            label: "IELTS Academic 8.0-9.0 (8.5-9.5)",
        },
    ],
};

const UT_CERT_APTIS = {
    code: "APTIS",
    label: "APTIS",
    options: [
        {
            value: 20,
            group: "APTIS",
            code: "GENERAL",
            label: "APTIS General Reading & Listening (A1-C2)",
        },
        {
            value: 21,
            group: "APTIS",
            code: "ADVANCE",
            label: "APTIS General Grammar & Vocabulary (A1-C2)",
        },
    ],
};

export const UT_CERT_TOEFL = {
    code: "TOEFL",
    label: "TOEFL",
    options: [
        {
            value: 57,
            group: "TOEFL",
            code: "PRIMARY",
            label: "TOEFL - Primary",
        },
        {
            value: 23,
            group: "TOEFL",
            code: "JUNIOR",
            label: "TOEFL - Junior (72-94)",
        },
        {
            value: 22,
            group: "TOEFL",
            code: "IBT1",
            label: "TOEFL iBT 42-94 (42-71)",
        },
        {
            value: 24,
            group: "TOEFL",
            code: "IBT",
            label: "TOEFL iBT 95-120 (95-113)",
        },
        {
            value: 25,
            group: "TOEFL",
            code: "ITP",
            label: "TOEFL - iTP (114-120)",
        },
    ],
};

export const UT_CERT_TOEIC = {
    code: "TOEIC",
    label: "TOEIC",
    options: [
        {
            value: 48,
            group: "TOEIC",
            code: "TOEIC-120-220",
            label: "TOEIC 120-220",
        },
        {
            value: 49,
            group: "TOEIC",
            code: "TOEIC-225-545",
            label: "TOEIC 225-545",
        },
        {
            value: 26,
            group: "TOEIC",
            code: "TOEIC-550-750",
            label: "TOEIC 550-750 (550-780)",
        },
        {
            value: 27,
            group: "TOEIC",
            code: "TOEIC-650-900",
            label: "TOEIC 650-900 (785-940)",
        },
        {
            value: 50,
            group: "TOEIC",
            code: "TOEIC-945-990",
            label: "TOEIC 945-990",
        },
    ],
};

export const UT_LANGUAGE_CERT = {
    code: "UT_LANGUAGE_CERT",
    label: "LanguageCert",
    options: [
        {
            code: 'YOUNG_LEARNERS_ESOL',
            label: 'Young Learners ESOL',
            options: [
                { label: 'Pre-A1 FOX', code: 'PRE-A1_FOX', value: 70 },
                { label: 'A1 OWL', code: 'A1_OWL', value: 71 },
            ],
        },
        {
            code: 'ESOL',
            label: 'ESOL',
            options: [
                { label: 'A1 Preliminary', code: 'A1_PRELIMINARY', value: 72 },
                { label: 'A2 Access', code: 'A2_ACCESS', value: 73 },
                { label: 'B1 Achiever', code: 'B1_ACHIEVER', value: 74 },
                { label: 'B2 Communicator', code: 'B2_COMMUNICATOR', value: 75 },
                { label: 'C1 Expert', code: 'C1_EXPERT', value: 76 },
                { label: 'C2 Mastery', code: 'C2_MASTERY', value: 77 },
            ],
        },
        {
            code: 'ESOL_FOR_SCHOOLS',
            label: 'ESOL for Schools',
            options: [
                { label: 'A1 For Schools', code: 'A1_FOR_SCHOOLS', value: 78 },
                { label: 'A2 For Schools', code: 'A2_FOR_SCHOOLS', value: 79 },
                { label: 'B1 For Schools', code: 'B1_FOR_SCHOOLS', value: 80 },
                { label: 'B2 For Schools', code: 'B2_FOR_SCHOOLS', value: 81 },
            ],
        },
    ]
}

export const UNIT_TEST_TYPE = [
    ...UNIT_TEST_INTERIOR,
    ...UT_CERT_CAMBRIDGE.options,
    UT_CERT_IELTS,
    UT_CERT_APTIS,
    UT_CERT_TOEFL,
    UT_CERT_TOEIC,
];

export const typeScope = {
    SYSTEM: "SYSTEM",
    USER: "USER",
};

export const cefrTypes = {
    NA: "NA",
    PA1Y: "PA1Y",
    A1Y: "A1Y",
    A2Y: "A2Y",
    A1: "A1",
    "A1+": "A1+",
    A2: "A2",
    B1: "B1",
    "B1+": "B1+",
    B2: "B2",
    C1: "C1",
    C2: "C2",
};

export const skillTypes = {
    PR: 'PR',
    VO: 'VO',
    GR: 'GR',
    RE: 'RE',
    WR: 'WR',
    LI: 'LI',
    SP: 'SP',
}

export const COLOR_SHAPES = [
    { color: "#fb2410", display: "red" },
    { color: "#fcfb2d", display: "yellow" },
    { color: "#62aa2d", display: "green" },
    { color: "#038af9", display: "blue" },
    { color: "#8400ab", display: "purple" },
    { color: "#000000", display: "black" },
];

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

