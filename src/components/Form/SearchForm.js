import React, { useEffect, Fragment } from "react";
import classNames from "classnames";
import { Form, Input, Button, Select, DatePicker, Row, Col, InputNumber } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";

import { camelCaseToTitleCase, flatten, removeAccents } from "@/utils";
import { DATE_FORMAT_DISPLAY, fieldTypes } from "@/constants";

import styles from "./SearchForm.module.scss";

const SearchForm = ({ id, form, searchFields, className, hiddenAction, onResetForm, onSubmit }) => {
    const getPlaceHolder = (item) => {
        return item.searchPlaceholder || `Search by ${camelCaseToTitleCase(item.key)}`;
    };

    const getLabelFieldItem = (item) => {
        if (item.isShowFilterLabel) return item.title;
        return "";
    };

    const onChangeAutocomplete = (value, item, fieldItem) => {
        const { onChange, reflectFields, isSubmitOnChangeValue } = fieldItem;
        if (isSubmitOnChangeValue) {
            onSubmit(form.getFieldsValue());
        }
        if (onChange) {
            onChange(value, item, form);
        }
        if (reflectFields) {
            const fileds = reflectFields.split(",");
            fileds.forEach((reflectFieldName) => form.setFieldValue(reflectFieldName, undefined));
        }
    };

    const onSelectValue = (value, fieldItem) => {
        const { isSubmitOnChangeValue, onSelectValue } = fieldItem;
        if (isSubmitOnChangeValue) {
            onSubmit(form.getFieldsValue());
        } else if (onSelectValue) {
            onSelectValue(value, form);
        }
    };

    const getSelectOptions = (fieldItem) => {
        let { options, initialValue, optionValueKey, optionLabelKey } = fieldItem;
        optionValueKey = optionValueKey || "value";
        optionLabelKey = optionLabelKey || "label";
        if (options && options.length > 0) return options;
        else if (initialValue) return [{ [optionValueKey]: initialValue, [optionLabelKey]: "" }];
        else return [];
    };

    const onChangeDateField = (date, fieldItem) => {
        if (fieldItem.onChange) {
            fieldItem.onChange(date);
        }

        if (fieldItem.fieldNameChild) {
            form.setFieldValue(fieldItem.fieldNameChild, null);
        }
    };

    const onFilterOption = (input, option) => {
        return removeAccents(option?.label ?? "")
            .toLowerCase()
            .includes(removeAccents(input).toLowerCase());
    };

    //remove dropdown selected value when invalid
    useEffect(() => {
        searchFields.forEach((item) => {
            const values = form.getFieldsValue();

            const options = flatten(item.options?.map((op) => op.options || op));
            if (item.fieldType === fieldTypes.SELECT && !item.itemProps?.mode) {
                const hasNoOption = options?.findIndex((op) => op.value?.toString() === values[item.key]) < 0;
                if (hasNoOption && options?.length) {
                    form.setFieldValue(item.key, null);
                }
            }
        });
    }, [searchFields, form]);

    const renderOption = (optionLabelKey, optionValueKey, optionOtherKey, customRender) => (option, index) => {
        const label = option[optionLabelKey];
        const value = option[optionValueKey];

        return (
            <Fragment key={index}>
                {customRender ? (
                    customRender(label, value, option)
                ) : (
                    <Select.Option key={value} other={option[optionOtherKey]} label={label}>
                        {label}
                    </Select.Option>
                )}
            </Fragment>
        );
    };

    const renderFormType = (fieldItem) => {
        if (fieldItem === undefined || fieldItem === null) {
            return null;
        }
        if (fieldItem.fieldType === fieldTypes.DATE) {
            const dateFormat = fieldItem.format || DATE_FORMAT_DISPLAY;
            return (
                <DatePicker
                    placeholder={getPlaceHolder(fieldItem)}
                    defaultValue={fieldItem.initialValue}
                    format={dateFormat}
                    onChange={(date) => onChangeDateField(date, fieldItem)}
                    disabledDate={fieldItem.disabledDate}
                    style={{ width: "100%" }}
                    {...(fieldItem.itemProps || {})}
                />
            );
        } else if (fieldItem.fieldType === fieldTypes.SELECT) {
            let {
                optionValueKey,
                optionLabelKey,
                optionOtherKey,
                loading,
                allowClear,
                disabled,
                renderItem,
                itemProps = {},
            } = fieldItem;
            optionValueKey = optionValueKey || "value";
            optionLabelKey = optionLabelKey || "label";
            optionOtherKey = optionOtherKey || "other";

            return (
                <Select
                    allowClear={allowClear !== false}
                    loading={loading}
                    placeholder={getPlaceHolder(fieldItem)}
                    defaultValue={fieldItem.initialValue}
                    onSelect={(value) => onSelectValue(value, fieldItem)}
                    onChange={(value, option) => fieldItem.onChange?.(value, option, form)}
                    getPopupContainer={() => document.getElementById("main-layout")}
                    style={{ width: "100%" }}
                    mode={fieldItem.mode}
                    disabled={disabled}
                    optionFilterProp={optionLabelKey}
                    {...itemProps}
                >
                    {getSelectOptions(fieldItem).map(
                        renderOption(optionLabelKey, optionValueKey, optionOtherKey, renderItem)
                    )}
                </Select>
            );
        } else if (fieldItem.fieldType === fieldTypes.AUTOCOMPLETE) {
            let {
                options,
                onSearch,
                optionValueKey,
                optionLabelKey,
                optionLabelProp,
                renderItem,
                loading,
                allowClear,
                mode,
                filterOption,
                itemProps = {},
            } = fieldItem;
            optionValueKey = optionValueKey || "value";
            optionLabelKey = optionLabelKey || "label";
            optionLabelProp = optionLabelProp || "children";
            return (
                <Select
                    showSearch
                    allowClear={allowClear !== false}
                    loading={loading}
                    placeholder={getPlaceHolder(fieldItem)}
                    defaultActiveFirstOption={false}
                    onChange={(value, item) => onChangeAutocomplete(value, item, fieldItem)}
                    onSearch={onSearch}
                    getPopupContainer={() => document.getElementById("main-layout")}
                    filterOption={filterOption ?? onFilterOption}
                    optionLabelProp={optionLabelProp}
                    style={{ width: "100%" }}
                    popupClassName={fieldItem.className}
                    mode={mode}
                    {...itemProps}
                >
                    {options.map(renderOption(optionLabelKey, optionValueKey, null, renderItem))}
                </Select>
            );
        } else if (fieldItem.fieldType === fieldTypes.NUMBER) {
            return (
                <InputNumber
                    defaultValue={fieldItem.initialValue}
                    placeholder={getPlaceHolder(fieldItem)}
                    className={styles.inputNumber}
                    {...(fieldItem.itemProps || {})}
                />
            );
        } else {
            return <Input defaultValue={fieldItem.initialValue} placeholder={getPlaceHolder(fieldItem)} />;
        }
    };

    return (
        <Form
            id={id}
            form={form}
            layout="inline"
            onFinish={onSubmit}
            className={classNames(styles.searchForm, { [className]: !!className })}
        >
            {
                <Row gutter={[16, 16]} className={styles.wrapper}>
                    {searchFields.map((fieldItem, index) => (
                        <Col
                            key={fieldItem.key}
                            span={fieldItem.gridCol || 8}
                            className={classNames(styles.item, { [styles.last]: index === searchFields.length - 1 })}
                        >
                            <Form.Item
                                label={getLabelFieldItem(fieldItem)}
                                name={fieldItem.key}
                                className={fieldItem.className}
                                hidden={fieldItem.hidden}
                            >
                                {renderFormType(fieldItem)}
                            </Form.Item>
                        </Col>
                    ))}
                    {hiddenAction ? null : (
                        <Col className={styles.actions}>
                            <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
                                Tìm kiếm
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={onResetForm} icon={<CloseOutlined />}>
                                Đặt lại
                            </Button>
                        </Col>
                    )}
                </Row>
            }
        </Form>
    );
};

export default SearchForm;
