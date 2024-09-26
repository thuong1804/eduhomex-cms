import React, { useEffect, useState } from 'react';
import { Form, Upload } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import FormItem from './FormItem';
import { generateCndImageUrl } from "@/utils";
import { generateImageFromBase64OrUrl } from "@/components/QuestionTemplate/Utils";

import styles from "./UploadFileLocalField.module.scss";
import { useNotification } from "@/hooks";

const UploadImage = ({
    value,
    onChange,
    maxCount,
    acceptType,
    uploadText,
    type,
    listType = 'picture-card',
    ...formItemProps
}) => {
    const { status } = Form.Item.useStatus();
    const [fileList, setFileList] = useState([]);
    const { showErrorMessage } = useNotification();

    const uploadFile = ({ file, onSuccess, onError }) => {
        if (file) {
            onSuccess(file);
        } else {
            onError();
        }
    };

    const handleChange = ({ fileList, file }) => {
        if (fileList?.length > 0 && !["image/jpeg", "image/png"].includes(file?.type) && type === 'image') {
            showErrorMessage("Chỉ hổ trợ các hình ảnh có định dạng: png, jpg, jpeg!");
            return;
        }

        if (fileList?.length > 0 && !["audio/mpeg"].includes(file.type) && type === 'audio') {
            showErrorMessage("Chỉ hổ trợ định dạng âm thanh mp3!");
            return;
        }

        const newList = fileList.map(el => {
            if (el.uid === file?.uid) {
                return {
                    ...el,
                    url: file.originFileObj,
                }
            }

            return el;
        });

        setFileList([...newList]);
        onChange(file.originFileObj)
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            {uploadText && <div style={{ marginTop: 8 }}>{uploadText}</div>}
        </div>
    );

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    useEffect(() => {
        const getFileFromValue = async () => {
            if (maxCount > 1) {
                return value?.map(el => ({ url: el, uid: `${el}-${new Date().getTime()}` })) || [];
            }
            if (typeof value === 'object') {
                return [{ url: await getBase64(value), uid: value.uid }];
            }
            return value ? [{
                url: value,
                uid: `${value}-${new Date().getTime()}`
            }] : [];
        }
        getFileFromValue().then(res => setFileList(res))
    }, [value]);

    const getImageUrl = (fileList, file) => {
        if (typeof fileList[0]?.url === 'object') {
            return file.thumbUrl;
        } else {
            return generateImageFromBase64OrUrl(file?.url);
        }
    }

    const renderItem = (file, fileList, { remove }) => {
        if (type === 'image') {
            return (
                fileList.length ?
                    <div className={styles.imgPreviewWrapper}>
                        <img src={getImageUrl(fileList, file)}
                            width="100%" height="auto" alt="image-upload" style={{ minHeight: 66 }} />

                        <DeleteOutlined onClick={remove} />
                    </div>
                    : null
            )
        }

        if (type === 'audio') {
            return (
                fileList.length ?
                    <div className={styles.audioWrapper}>
                        <audio
                            controls>
                            <source
                                src={
                                    typeof fileList[0]?.url === 'object' ? URL.createObjectURL(file?.url) : generateCndImageUrl(file?.url)
                                }
                                type="audio/mpeg"
                            />
                        </audio>
                        <DeleteOutlined onClick={remove} />
                    </div>
                    : null
            )
        }
    }

    return (
        <Upload
            className={status === 'error' && styles.error}
            showUploadList={{
                showPreviewIcon: false
            }}
            multiple={false}
            customRequest={uploadFile}
            maxCount={maxCount}
            onChange={handleChange}
            accept={acceptType}
            fileList={fileList}
            itemRender={(_, file, fileList, { remove }) => {
                return renderItem(file, fileList, { remove });
            }}
            listType={listType}
        >
            {fileList?.length < maxCount && uploadButton}
        </Upload>
    );
}

const UploadImageField = ({
    type = 'image',
    disabled,
    defaultValue,
    prefix,
    maxCount = 1,
    acceptType,
    uploadText,
    listType,
    ...formItemProps
}) => {
    return (
        <FormItem
            {...formItemProps}
            style={{ margin: 0 }}
        >
            <UploadImage 
                listType={listType} 
                maxCount={maxCount} 
                acceptType={acceptType} 
                uploadText={uploadText}
                type={type} {...formItemProps} 
            />
        </FormItem>
    )
}

export default UploadImageField;
