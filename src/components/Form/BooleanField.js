import React from 'react';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Switch } from 'antd';

import FormItem from './FormItem';
import { fieldTypes } from '@/constants';

const BooleanField = ({
    disabled,
    onChange,
    checkedChildren,
    unCheckedChildren,
    defaultChecked = false,
    switchProps = {},
    ...formItemProps
}) => {
    const BooleanInput = ({ ...inputProps }) => {
        const onChangeInput = (checked, e) => {
            inputProps?.onChange?.(checked, e);
            onChange?.(checked, e);
        }

        return (
            <Switch
                disabled={disabled}
                defaultChecked={defaultChecked}
                checkedChildren={checkedChildren || <CheckOutlined/>}
                unCheckedChildren={unCheckedChildren || <CloseOutlined/>}
                {...inputProps}
                {...switchProps}
                onChange={onChangeInput}
            />
        );
    }

    return (
        <FormItem
            fieldType={fieldTypes.BOOLEAN}
            valuePropName="checked"
            {...formItemProps}
        >
            <BooleanInput />
        </FormItem>
    )
}

export default BooleanField;
