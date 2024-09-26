import { commonStatus, currencyTypes, userRoles, typeScope, RESOURCE_TYPES, APPS, resourceType, skillTypes, UNIT_TEST_INTERIOR, UT_CERT_CAMBRIDGE, UT_CERT_IELTS, UT_CERT_TOEIC, UT_CERT_TOEFL, UT_NATIONAL_EXAM, bookTypes, sourceType, UT_LANGUAGE_CERT, subjectType, typeEduhome, commonStatusNotification } from ".";

export const statusDDL = [
    { value: commonStatus.ACTIVE, label: 'Hoạt động' },
    { value: commonStatus.LOCK, label: 'Ngưng hoạt động' },
];

export const statusNotificationDDL = [
    { value: commonStatusNotification.SCHEDULED, label: 'Đã gửi' },
    { value: commonStatusNotification.DELIVERED, label: 'Đã lên lịch' },
];

export const resourceDDL = [
    { value: resourceType.ALL, label: "LMS đa tài nguyên" },
    { value: resourceType.ITEST, label: "LMS i-Test" },
];

export const subjectDDL = [
    { value: subjectType.EN, label: "Tiếng anh" },
];

export const sourceTypeDDL = [
    { value: sourceType.DTP, label: "DTP" },
    { value: sourceType.MOET, label: "MOET" },
]

export const eduhomeTypeDDL = [
    { value: typeEduhome.DHA, label: "DHA" },
    { value: typeEduhome.DCR, label: "DCR" },
    { value: typeEduhome.EWB, label: "Online Workbook" },

]

export const resourceTypeValueDDL = [
    {
        value: 1, label: 'Theo đơn vị bài học', groups: [bookTypes.SUPPLEMENTARY, bookTypes.BOOK]
    },
    {
        value: 2, label: 'Theo chuyên đề', groups: [bookTypes.SUPPLEMENTARY, bookTypes.BOOK]
    },
    {
        value: 3, label: 'Theo kỹ năng', groups: [bookTypes.SUPPLEMENTARY, bookTypes.BOOK]
    },
    {
        value: 4, label: 'Kiểm tra thường xuyên', groups: [bookTypes.SUPPLEMENTARY, bookTypes.BOOK]
    },
    {
        value: 6, label: 'Kiểm tra giữa kỳ', groups: [bookTypes.SUPPLEMENTARY, bookTypes.BOOK]
    },
    {
        value: 7, label: 'Kiểm tra cuối kỳ', groups: [bookTypes.SUPPLEMENTARY, bookTypes.BOOK]
    },
    {
        value: 9, label: 'Đánh giá năng lực',
    },
    {
        value: 10, label: 'Tốt nghiệp THPT',
    },
    {
        value: 11, label: 'Pre-A1 Starters',
    },
    {
        value: 12, label: 'A1 Movers',
    },
    {
        value: 13, label: 'A2 Flyers',
    },
    {
        value: 14, label: 'A2 Key for Schools',
    },
    {
        value: 15, label: 'A2 Key',
    },
    {
        value: 16, label: 'B1 Preliminary for Schools',
    },
    {
        value: 17, label: 'B1 Preliminary',
    },
    {
        value: 54, label: 'B2 First',
    },
    {
        value: 55, label: 'C1 Advanced',
    },
    {
        value: 56, label: 'C2 Proficiency',
    },
    {
        value: 18, label: 'Pre-IELTS 3.0-3.5',
    },
    {
        value: 19, label: 'IELTS Academic 4.0-5.5',
    },
    {
        value: 28, label: 'IELTS Academic 5.0-6.5 (5.5-6.5)',
    },
    {
        value: 46, label: 'IELTS Academic 7.0-8.0',
    },
    {
        value: 47, label: 'IELTS Academic 8.0-9.0 (8.5-9.5)',
    },
    {
        value: 20, label: 'APTIS General Reading & Listening (A1-C2)',
    },
    {
        value: 21, label: 'APTIS General Grammar & Vocabulary (A1-C2)',
    },
    {
        value: 57, label: 'TOEFL - Primary',
    },
    {
        value: 23, label: 'TOEFL - Junior (72-94)',
    },
    {
        value: 22, label: 'TOEFL iBT 42-94 (42-71)',
    },
    {
        value: 24, label: 'TOEFL iBT 95-120 (95-113)',
    },
    {
        value: 25, label: 'TOEFL - iTP (114-120)',
    },
    {
        value: 48, label: 'TOEIC 120-220',
    },
    {
        value: 49, label: 'TOEIC 225-545',
    },
    {
        value: 26, label: 'TOEIC 550-750 (550-780)',
    },
    {
        value: 27, label: 'TOEIC 650-900 (785-940)',
    },
    {
        value: 50, label: 'TOEIC 945-990',
    },
    {
        value: 60, label: 'Tiểu học',
    },
    {
        value: 61, label: 'Tổng quát',
    },
    {
        value: 70, label: 'Pre-A1 FOX',
    },
    {
        value: 71, label: 'A1 OWL',
    },
    {
        value: 72, label: 'A1 Preliminary',
    },
    {
        value: 73, label: 'A2 Access',
    },
    {
        value: 74, label: 'B1 Achiever',
    },
    {
        value: 75, label: 'B2 Communicator',
    },
    {
        value: 76, label: 'C1 Expert',
    },
    {
        value: 77, label: 'C2 Mastery',
    },
    {
        value: 78, label: 'A1 For Schools',
    },
    {
        value: 79, label: 'A2 For Schools',
    },
    {
        value: 80, label: 'B1 For Schools',
    },
    {
        value: 81, label: 'B2 For Schools',
    }
]

export const resourceItestDDL = [
    {
        label: 'Đề thi theo sách',
        code: 'BOOK',
        options: [
            { label: 'Sách giáo khoa', value: UNIT_TEST_INTERIOR[0].options.map(op => op.value).toString() },
            { label: 'Giáo trình', value: UNIT_TEST_INTERIOR[1].options.map(op => op.value).toString() },
        ],
    },
    {
        label: 'Bài thi quốc tế',
        code: 'SUPPLEMENTARY',
        options: [
            { label: 'CAMBRIDGE', value: UT_CERT_CAMBRIDGE.options.flatMap(value => value.options.map(op => op.value)).toString()},
            { label: 'APTIS', value: [20, 21].toString() },
            { label: 'IELTS', value: UT_CERT_IELTS.options.map(op => op.value).toString() },
            { label: 'TOEIC', value: UT_CERT_TOEIC.options.map(op => op.value).toString() },
            { label: 'TOELF', value: UT_CERT_TOEFL.options.map(op => op.value).toString() },
            { label: 'LANGUAGE CERT', value: UT_LANGUAGE_CERT.options.flatMap(item => item.options.map(op => op.value)).toString()},
        ],
    },
    {
        label: 'Bài thi trong nước',
        code: 'INTERNAL',
        options: [
            { label: 'Tuyển sinh lớp 10', value: 8 },
            { label: 'Tốt nghiệp THPT', value: 10 },
            { label: 'Đánh giá năng lực', value: 9 },
            { label: 'VSTEP', value:  UT_NATIONAL_EXAM[3].options.map(op => op.value).toString() },
            { label: 'Thi xếp lớp', value: [60, 61].toString() },
        ],
    },
]


export const treeResourceItest = [
    {
        title: "Đề thi theo Sách",
        value: UNIT_TEST_INTERIOR.flatMap(item => 
            item.options ? item.options.map(op => op.value) : []).toString(),
        children: [
            {
                title: "Sách giáo khoa",
                value: UNIT_TEST_INTERIOR[0].options.map(op => op.value).toString(),
            },
            {
                title: "Giáo trình",
                value: UNIT_TEST_INTERIOR[1].options.map(op => op.value).toString(),
            },
        ],
    },
    {
        title: "Bài thi quốc tế",
        value: [
            UT_CERT_CAMBRIDGE.options.flatMap(value => value.options.map(op => op.value)), 
            20, 21, UT_CERT_IELTS.options.map(op => op.value),
            UT_CERT_TOEIC.options.map(op => op.value),
            UT_CERT_TOEFL.options.map(op => op.value),
            UT_LANGUAGE_CERT.options.flatMap(item => item.options.map(op => op.value))
        ].toString(),
        children: [
            { 
                title: 'LANGUAGE CERT', 
                value: UT_LANGUAGE_CERT.options.flatMap(item => item.options.map(op => op.value)).toString()},

            {
                title: "CAMBRIDGE",
                value: UT_CERT_CAMBRIDGE.options.flatMap(value => value.options.map(op => op.value)).toString(),
            },
            {
                title: "APTIS",
                value: [20, 21].toString(),
            },
            {
                title: "IELTS",
                value: UT_CERT_IELTS.options.map(op => op.value).toString(),
            },
            {
                title: "TOEIC",
                value: UT_CERT_TOEIC.options.map(op => op.value).toString(),
            },
            {
                title: "TOELF",
                value: UT_CERT_TOEFL.options.map(op => op.value).toString(),
            },
        ],
    },
    {
        title: "Bài thi trong nước",
        value: [8, 10, 9, UT_NATIONAL_EXAM[3].options.map(op => op.value)].toString(),
        children: [
            {
                title: "Tuyển sinh lớp 10",
                value: 8,
            },
            {
                title: "Tốt nghiệp THPT",
                value: 10,
            },
            {
                title: "Đánh giá năng lực",
                value: 9,
            },
            {
                title: "VSTEP",
                value:  UT_NATIONAL_EXAM[3].options.map(op => op.value).toString(),
            },
        ],
    },
    {
        title: "Thi xếp lớp",
        value: [60, 61].toString(),
    },
];

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

export const resourceTypeDDL = [
    { value: RESOURCE_TYPES.APP, label: "Chọn theo ứng dụng" },
    { value: RESOURCE_TYPES.SUPPLEMENTARY, label: "Chọn theo ứng dụng bổ trợ" },
    { value: RESOURCE_TYPES.SERIES, label: "Chọn theo chương trình" },
    { value: RESOURCE_TYPES.UNIT_TEST, label: "Chọn theo đề thi" },
];

export const appsDDL = [
    { value: APPS.ITEST, label: "i-Test" },
    { value: APPS.EDUHOME, label: "Eduhome" },
    { value: APPS.EDUFUN, label: "Edufun" },
];

export const skillDDL = [
  {value: skillTypes.PR, label: 'Pronunciation'},
  {value: skillTypes.VO, label: 'Vocab'},
  {value: skillTypes.GR, label: 'Grammar'},
  {value: skillTypes.RE, label: 'Reading'},
  {value: skillTypes.WR, label: 'Writing'},
  {value: skillTypes.LI, label: 'Listening'},
  {value: skillTypes.SP, label: 'Speaking'},
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