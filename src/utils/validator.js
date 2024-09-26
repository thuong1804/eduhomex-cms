import { passwordRegex, phoneRegExp, whiteSpaceRegex } from "@/constants"

export const validationPhone = () => {
    return [
        {
            pattern: phoneRegExp,
            message: "Số điện thoại không hợp lệ!"
        },
    ]
}

export const validationPassword = (prefixMsg) => {
    return [
        { required: true, message: `${prefixMsg} không được bỏ trống!` },
        {
            pattern: whiteSpaceRegex,
            message: `${prefixMsg} không được bắt đầu và kết thúc bằng khoảng trắng!`
        },
        {
            pattern: passwordRegex,
            message: `${prefixMsg} chỉ được sử dụng chữ cái, số và ký tự đặc biệt thường gặp!`
        },
        {
            min: 8,
            message: `${prefixMsg} phải có tối thiểu 8 ký tự!`
        }
    ]
}

export const validationEmail = () => {
    return [{
        type: "email",
        message: "Email chưa đúng định dạng!"
    }]
}

export const validationNumberQuestionOrExample = (showErrorMessage, numberExample = 1) => {
    return [
        {
            validator: (_, value = []) => {
                const displayedQuestions = value.filter(item => !item.isDeleted && Object.keys(item)?.length > 0);
                if (displayedQuestions.filter(item => !item.isQuestion).length > numberExample) {
                    showErrorMessage?.(`Chỉ cho phép tối đa ${numberExample} ví dụ`);
                    return Promise.reject(new Error(!showErrorMessage ? `Chỉ cho phép tối đa ${numberExample} ví dụ` : ""));
                } else if (!displayedQuestions.some(item => item.isQuestion)) {
                    showErrorMessage?.("Vui lòng nhập ít nhất một câu hỏi");
                    return Promise.reject(new Error(!showErrorMessage ? "Vui lòng nhập ít nhất một câu hỏi" : ""));
                }

                return Promise.resolve();
            }
        }
    ]
}

export const validationMaxLength = (label = "Danh sách đáp án") => {
    return [
        {
            validator: (_, value = []) => {
                const displayedQuestions = value.filter(item => !item.isDeleted && Object.keys(item)?.length > 0);
                if (displayedQuestions.map(item => item.answers.map(ans => ans.text).join("")).join("").length > 10000) {
                    return Promise.reject(new Error(`${label} chỉ chưa tối đa 10000 ký tự`));
                }

                return Promise.resolve();
            }
        }
    ]
}

export const validationRadioTrueFalse = (form, fieldName) => {
    return [{
        validator: () => {
            const requiredCheck = form.getFieldValue(fieldName);
            if (!requiredCheck) {
                return Promise.reject();
            }

            return Promise.resolve();
        }
    }]
}