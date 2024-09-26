import React, { useCallback } from "react";
import { Select } from 'antd';

import FormItem from './FormItem';
import { fieldTypes } from '@/constants';
import { removeAccents } from "@/utils";

import styles from './DropdownField.module.scss';

const DropdownField = ({
    loading,
    disabled,
    mode,
    options,
    optionValue,
    optionLabel,
    optionOther,
    onChange,
    onSelect,
    defaultValue,
    allowClear,
    showSearch,
    onFilterSearch,
    renderLabel,
    maxTagCount,
    shouldChangeValue,
    getPopupContainer,
    maxTagPlaceholder,
    renderTagAsText,
    onBlur,
    searchValue,
    tagRender,
    style,
    ...formItemProps
}) => {
    const optionValueKey = optionValue || 'value';
    const optionLabelKey = optionLabel || 'label';
    const optionOtherKey = optionOther || 'other';
    const renderTagAsTextProps = () => {
        if (renderTagAsText) {
            return {
                showSearch: false,
                maxTagCount: 0,
                maxTagPlaceholder: tags => {
                    const textValue = tags.map(el => el.label).join(', ');
                    return <div title={textValue} className={styles.tagsText}>{textValue}</div>;
                },
                className: styles.selectTagsAsText,
            };
        }

        return {};
    }

    const DropdownInput = useCallback(({ getPlaceHolder, ...inputProps }) => {
        const onSearch = (input, option) => {
            if (!onFilterSearch) {
                return removeAccents(option?.label ?? '').toLowerCase().includes(removeAccents(input).toLowerCase())
            }

            return onFilterSearch(input, option);
        }

        const onChangeValue = async (e, option) => {
            if (!shouldChangeValue || await shouldChangeValue(e)) {
                inputProps.onChange(e);
                onChange?.(e, option);
            }
        }

        return (
            <Select
                allowClear={allowClear ?? !loading}
                loading={loading}
                placeholder={getPlaceHolder()}
                mode={mode}
                maxTagCount={maxTagCount}
                style={style}
                disabled={disabled}
                onSelect={onSelect}
                defaultValue={defaultValue}
                searchValue={searchValue}
                tagRender={tagRender}
                getPopupContainer={(trigger) => getPopupContainer ? getPopupContainer() : trigger.parentElement}
                {...(showSearch ? {
                    showSearch,
                    filterOption: onSearch
                } : { showSearch })}
                {...inputProps}
                onBlur={onBlur}
                onChange={onChangeValue}
                {...renderTagAsTextProps()}
            >
                {options?.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            {Array.isArray(item.options) ?
                                <Select.OptGroup label={item.label}>
                                    {item.options.map(op =>
                                        <Select.Option
                                            key={op[optionValueKey]}
                                            value={op[optionValueKey]}
                                            label={op.label}
                                            other={op[optionOtherKey]}
                                            disabled={op.disabled}
                                        >
                                            {renderLabel ? renderLabel(op) : op[optionLabelKey]}
                                        </Select.Option>
                                    )}
                                </Select.OptGroup>
                                :
                                <Select.Option
                                    key={item[optionValueKey]}
                                    value={item[optionValueKey]}
                                    label={item.label}
                                    other={item[optionOtherKey]}
                                    disabled={item.disabled}
                                >
                                    {renderLabel ? renderLabel(item) : item[optionLabelKey]}
                                </Select.Option>
                            }
                        </React.Fragment>
                    )
                })}
            </Select>
        )
    }, [options, loading, onSelect, defaultValue, disabled, onChange, searchValue])

    return (
        <FormItem
            fieldType={fieldTypes.SELECT}
            {...formItemProps}
        >
            <DropdownInput />
        </FormItem>
    )
}

export default DropdownField;
