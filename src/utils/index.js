import { userRoles } from "@/constants";
import paths from "@/constants/paths";

export const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toFixedNumber = (value, fractionDigits = 2) => {
    const numericValue = typeof value === "number" ? value : 0;
    if (!isNaN(numericValue)) {
        return Number(numericValue.toFixed(fractionDigits));
    }
    return null;
};

export const isNumeric = (value) => {
    return /^-?\d+$/.test(value);
};

export const camelCaseToTitleCase = (camelCase) => {
    if (camelCase === null || camelCase === "") {
        return camelCase;
    }

    camelCase = camelCase.trim();
    let newText = "";
    for (let i = 0; i < camelCase.length; i++) {
        if (/[A-Z]/.test(camelCase[i]) && i !== 0 && /[a-z]/.test(camelCase[i - 1])) {
            newText += " ";
        }
        if (i === 0 && /[a-z]/.test(camelCase[i])) {
            newText += camelCase[i].toLowerCase();
        } else {
            newText += camelCase[i].toLowerCase();
        }
    }

    return newText;
};

export const removeAccents = (str) => {
    if (str)
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D");
    return str;
};

export const cleanObject = (obj, isNullish) => {
    let result = {};
    if (obj) {
        Object.keys(obj).forEach((key) => {
            if (
                (!Array.isArray(obj[key]) && (isNullish ? ![undefined, null, NaN].includes(obj[key]) : obj[key])) ||
                obj[key]?.length
            )
                result[key] = obj[key];
        });
    }
    return result;
};

export const formatNumber = (value) => {
    if (value) {
        const decimalPosition = value.toString().indexOf(".");
        if (decimalPosition > 0) {
            const intVal = value.toString().substring(0, decimalPosition);
            const decimalVal = value.toString().substring(decimalPosition + 1);
            return `${intVal.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${decimalVal}`;
        }
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else if (value === 0) return 0;
    return "";
};

export const findNestedObj = (entireObj, keyToFind, valToFind) => {
    let foundObj;
    JSON.stringify(entireObj, (_, nestedValue) => {
        if (nestedValue && nestedValue[keyToFind] === valToFind) {
            foundObj = nestedValue;
        }
        return nestedValue;
    });
    return foundObj;
};

export const differenceArray = (arr1, arr2) => {
    if (!arr1.length && !arr2.length) return [];
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];

    return arr1.filter((x) => !arr2.includes(x));
};

export const getErrMsgFromApi = (errorRes) => {
    if (errorRes.errors?.length) {
        return <div dangerouslySetInnerHTML={{ __html: errorRes.errors.map((item) => item.message).join("<br/>") }} />;
    }
    return errorRes.message;
};

export const combineName = (data) => {
    return [data.lastName, data.firstName].filter((item) => item).join(" ");
};

export const mappingDropdownData = (options = [], cb) => {
    return options.map((item) => cb ? cb(item) : ({ label: item.name, value: item.id }));
};

export const getRedirectUrlByRole = (role) => {
    if ([userRoles.ADMIN].includes(role)) return paths.schoolList;

    return paths.schoolList;
};

export const flatten = (data = []) => {
    return data.reduce((a, b) => a.concat(b), []);
};

