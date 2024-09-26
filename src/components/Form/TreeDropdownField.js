import React, { useCallback } from "react";
import { TreeSelect as AntdTreeSelect } from "antd";

import FormItem from "./FormItem";
import { CHECKED_STRATEGY_TYPES } from "@/constants";

const { SHOW_PARENT, SHOW_ALL, SHOW_CHILD } = AntdTreeSelect;

const CHECKED_STRATEGY = {
    [CHECKED_STRATEGY_TYPES.SHOW_PARENT]: SHOW_PARENT,
    [CHECKED_STRATEGY_TYPES.SHOW_ALL]: SHOW_ALL,
    [CHECKED_STRATEGY_TYPES.SHOW_CHILD]: SHOW_CHILD,
};

const TreeDropdownField = ({
    loading,
    shouldChangeValue,
    disabled,
    mode,
    treeData,
    treeCheckable,
    showCheckedStrategy,
    onChange,
    allowClear = true,
    ...formItemProps
}) => {
    const TreeSelect = useCallback(
        ({ getPlaceHolder, ...selectProps }) => {
            const onChangeValue = async (e, option) => {
                if (!shouldChangeValue || (await shouldChangeValue(e))) {
                    selectProps.onChange(e);
                    onChange?.(e, option);
                }
            };
            return (
                <AntdTreeSelect
                    allowClear={allowClear ?? !loading}
                    loading={loading}
                    placeholder={getPlaceHolder()}
                    disabled={disabled}
                    mode={mode}
                    treeData={treeData}
                    treeCheckable={treeCheckable}
                    showCheckedStrategy={CHECKED_STRATEGY[showCheckedStrategy]}
                    treeDefaultExpandAll={true}
                    {...selectProps}
                    onChange={onChangeValue}
                />
            );
        },
        [loading, treeData, disabled, onChange]
    );

    return (
        <FormItem {...formItemProps}>
            <TreeSelect />
        </FormItem>
    );
};

export default TreeDropdownField;
