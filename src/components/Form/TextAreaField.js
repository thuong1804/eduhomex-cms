import React, { useCallback } from 'react';

import { Input } from 'antd';

import FormItem from './FormItem';

import styles from "./TextAreaField.module.scss";
import classNames from "classnames";

const { TextArea } = Input;

const TextField = ({
    maxLength = 255,
    maxLengthMsg,
    type,
    disabled,
    onBlur,
    defaultValue,
    prefix,
    notAllowWhiteSpace,
    showCount,
    rows = 2,
    disableKeys = [],
    spellCheck = false,
    removeReturn,
    ...formItemProps
}) => {
    const getMaxLengthMsg = () => {
        return maxLengthMsg || `${formItemProps.label} chỉ chứa tối đa ${maxLength} ký tự`;
    }

    const getTextFieldRules = () => {
        const rules = [];
        if (maxLength) {
            removeReturn ?
                rules.push({
                    validator: (rule, value, cb) => {
                        if (value?.replace(/\r/g, '')?.length > maxLength) {
                            return Promise.reject(new Error(getMaxLengthMsg()))
                        } else {
                            return Promise.resolve();
                        }
                    }
                })
                :
                rules.push({ max: maxLength, message: getMaxLengthMsg() });
        }
        if (notAllowWhiteSpace) {
            rules.push({ whitespace: true, message: 'Không được phép nhập giá trị chỉ có khoảng trắng!' });
        }

        return rules;
    }

    const InputAreaText = useCallback(({ getPlaceHolder, ...inputProps }) => {
        const handleChange = (e) => {
            let value = e.target.value;
            inputProps.onChange?.(value);
        }

        const onKeyDown = (e) => {
            if ([...disableKeys].includes(e.key)) {
                e.preventDefault();
                e.stopPropagation();
            }
        }

        if (removeReturn) {
            inputProps.value = inputProps.value?.replaceAll("\r", '');
        }

        return (
            <TextArea
                placeholder={getPlaceHolder()}
                defaultValue={defaultValue}
                disabled={disabled}
                type={type}
                onBlur={onBlur}
                prefix={prefix}
                rows={rows}
                spellCheck={spellCheck}
                {...(showCount ? { showCount, maxLength } : {})}
                {...inputProps}
                onChange={handleChange}
                onKeyDown={onKeyDown}
            />
        )
    }, [type, prefix, showCount, maxLength, rows, disabled, defaultValue])

    return (
        <FormItem
            {...formItemProps}
            className={classNames(showCount && styles.hasShowCount, formItemProps.className)}
            fieldRules={getTextFieldRules()}
        >
            <InputAreaText />
        </FormItem>
    )
}

export default TextField;
