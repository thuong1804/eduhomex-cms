import React, { useCallback } from 'react';

import { Input } from 'antd';

import FormItem from './FormItem';

const TextField = ({
    maxLength = 255,
    maxLengthMsg,
    type,
    disabled,
    onBlur,
    defaultValue,
    prefix,
    notAllowWhiteSpace,
    onlyNumber,
    autoFocus,
    innerRef,
    autoComplete,
    addonAfter,
    regex,
    disableKeys = [],
    hiddenErrorMessage,
    preventInputWhenMaxLength,
    formatter,
    onKeyDown,
    getPlaceHolder,
    rules = [],
    ...formItemProps
}) => {

    const getMaxLengthMsg = () => {
        return maxLengthMsg || `${formItemProps.label || ''} chỉ chứa tối đa ${maxLength} ký tự`;
    }

    const getTextFieldRules = (rules = []) => {
        if (maxLength) {
            rules.push({ max: maxLength, message: getMaxLengthMsg() });
        }
        if (notAllowWhiteSpace) {
            rules.push({ whitespace: true, message: 'Không được phép nhập giá trị chỉ có khoảng trắng!' });
        }

        if (hiddenErrorMessage) {
            rules = rules.map(item => ({ ...item, message: '' }));
        }

        return rules;
    }

    const InputText = useCallback(({ getPlaceHolder, ...inputProps }) => {
        const handleChange = (e) => {
            let value = formatter ? formatter(e.target.value) : e.target.value;
            if (onlyNumber) {
                value = e.target.value.replace(/\D/g, '');
            }
            if (regex) {
                value = e.target.value.replace(regex, '');
            }
            inputProps.onChange?.(value);
        }

        const onKeyDownValue = (e) => {
            if ([...disableKeys].includes(e.key)) {
                e.preventDefault();
                e.stopPropagation();
            }
            onKeyDown?.(e);
        }

        return (
            <Input
                placeholder={getPlaceHolder?.()}
                defaultValue={defaultValue}
                disabled={disabled}
                type={type}
                onBlur={onBlur}
                prefix={prefix}
                ref={innerRef}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                addonAfter={addonAfter}
                onKeyDown={onKeyDownValue}
                maxLength={preventInputWhenMaxLength ? maxLength : undefined}
                {...inputProps}
                onChange={handleChange}
            />
        )
    }, [defaultValue, type, onBlur, prefix, disabled])

    return (
        <FormItem
            {...formItemProps}
            fieldRules={getTextFieldRules(rules)}
        >
            <InputText getPlaceHolder={getPlaceHolder} />
        </FormItem>
    )
}

export default TextField;
