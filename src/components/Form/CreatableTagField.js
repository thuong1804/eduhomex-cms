import React, { useEffect, useRef, useState } from "react";
import { Input, Space, Tag, theme, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const CreatableTagField = ({ value = [], onChange, placeholder = "Thêm tag mới" }) => {
    const { token } = theme.useToken();
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState("");
    const inputRef = useRef(null);
    const editInputRef = useRef(null);

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    useEffect(() => {
        editInputRef.current?.focus();
    }, [editInputValue]);

    const handleClose = (removedTag) => {
        const newTags = value.filter((tag) => tag !== removedTag);
        onChange?.(newTags);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        const trimmedInput = inputValue.trim();
        if (trimmedInput && !value.includes(trimmedInput)) {
            onChange?.([...value, trimmedInput]);
        }
        setInputVisible(false);
        setInputValue("");
    };

    const handleEditInputChange = (e) => {
        setEditInputValue(e.target.value);
    };

    const handleEditInputConfirm = () => {
        const newTags = [...value];
        newTags[editInputIndex] = editInputValue;
        onChange?.(newTags);
        setEditInputIndex(-1);
        setEditInputValue("");
    };

    const tagInputStyle = {
        width: 64,
        height: 22,
        marginInlineEnd: 8,
        verticalAlign: "top",
    };

    const tagPlusStyle = {
        height: 22,
        background: token.colorBgContainer,
        borderStyle: "dashed",
    };

    return (
        <Space size={[0, 8]} wrap>
            {typeof value === "object" &&
                value?.map((tag, index) => {
                    if (editInputIndex === index) {
                        return (
                            <Input
                                ref={editInputRef}
                                key={index}
                                size="small"
                                style={tagInputStyle}
                                value={editInputValue}
                                onChange={handleEditInputChange}
                                onBlur={handleEditInputConfirm}
                                onPressEnter={handleEditInputConfirm}
                            />
                        );
                    }
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag
                            key={index}
                            closable={true}
                            style={{
                                userSelect: "none",
                            }}
                            onClose={() => handleClose(tag)}
                        >
                            <span
                                onDoubleClick={(e) => {
                                    if (index !== 0) {
                                        setEditInputIndex(index);
                                        setEditInputValue(tag);
                                        e.preventDefault();
                                    }
                                }}
                            >
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </span>
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={index}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                })}
            {inputVisible ? (
                <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    style={tagInputStyle}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            ) : (
                <Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
                    {placeholder}
                </Tag>
            )}
        </Space>
    );
};

export default CreatableTagField;
