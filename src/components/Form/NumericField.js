import React from 'react';
import { InputNumber } from 'antd';

import FormItem from './FormItem';
import { formatNumber } from '@/utils';
import { fieldTypes } from '@/constants';

const NumericInput = ({
    getPlaceHolder,
    onChange,
    width,
    onInputChange,
    formatter,
    onBlur,
    ...inputProps
}) => {
    const handleChange = e => {
        onInputChange?.(e);
        onChange(e);
    }

    return (
        <InputNumber
            formatter={value => formatNumber(formatter ? formatter(value) : value)}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            placeholder={getPlaceHolder()}
            style={{ width: width || '60%' }}
            {...inputProps}
            onChange={handleChange}
            onBlur={onBlur}
        />
    );
}

const NumericField = ({
    disabled,
    min,
    max,
    defaultValue,
    width,
    value,
    precision,
    formatter,
    controls,
    onBlur,
    getPlaceHolder,
    inputProps,
    ...formItemProps
}) => {
    return (
        <FormItem
            fieldType={fieldTypes.NUMBER}
            {...formItemProps}
        >
            <NumericInput
                {...inputProps}
                max={max}
                min={min}
                defaultValue={defaultValue}
                disabled={disabled}
                width={width}
                value={value}
                precision={precision}
                formatter={formatter}
                controls={controls}
                onBlur={onBlur}
                getPlaceHolder={getPlaceHolder}
            />
        </FormItem>
    )
}

export default NumericField;
