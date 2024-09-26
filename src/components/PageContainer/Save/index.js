import { useEffect, useState, useCallback, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Form } from "antd";
import { useDispatch } from "react-redux";

import { PageWrapper } from "@/components";
import { useNotification } from "@/hooks";

import styles from "./index.module.scss";
import classNames from "classnames";

const DEFAULT_BUTTON_ACTIONS = {
    SUBMIT: "SUBMIT",
    CANCEL: "CANCEL",
};

const SavePageContainer = ({
    form: SaveForm,
    isCreating,
    objectName,
    actionButtons,
    disableActions,
    listUrl,
    detailUrl,
    tabs: tabsProp,
    createAction,
    updateAction,
    getDetailAction,
    onCreate: onCreateProp,
    onUpdate: onUpdateProp,
    getBreadcrumbs,
    getTabs,
    onChangeTab,
    getDetailDataMapping,
    pageTitle,
    isRefreshUpdateSuccess = false,
    prepareUpdateData,
    prepareCreateData,
    formProps = {},
    extraActionButtons,
    onSaveSuccessProps,
    getSaveFailedMsg,
    handleSaveFailedData,
    saveErrorMsg,
    ...restProps
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [detailData, setDetailData] = useState({});
    const { id } = useParams();
    const [form] = Form.useForm();

    const { showErrorMessage, showSuccessMessage } = useNotification();

    const formId = `form-${objectName}`;
    const breadcrumbs = getBreadcrumbs?.(detailData) || [];
    const tabs = getTabs?.(detailData) || tabsProp;

    const onCancel = () => {
        navigate(-1);
    };

    const onCreate = (values) => {
        if (onCreateProp) {
            onCreateProp(values);
        } else if (createAction) {
            setIsSubmitting(true);
            dispatch(
                createAction({
                    params: prepareCreateData ? prepareCreateData(values) : values,
                    onCompleted: (response) => {
                        if (response?.result) {
                            onSaveSuccess(response.data);
                        } else {
                            onSaveFail(response);
                        }
                    },
                    onError: (err) => {
                        onSaveFail(err);
                        handleSaveFailedData?.(err, form);
                    },
                })
            );
        }
    };

    const onUpdate = (values) => {
        if (onUpdateProp) {
            onUpdateProp(values);
        } else if (updateAction) {
            setIsSubmitting(true);
            dispatch(
                updateAction({
                    params: prepareUpdateData
                        ? prepareUpdateData(values, detailData)
                        : { id: detailData.id, ...values },
                    onCompleted: (response) => {
                        if (response?.result) {
                            onSaveSuccess(response.data);
                        } else {
                            onSaveFail(response);
                        }
                    },
                    onError: (err) => {
                        onSaveFail(err);
                        handleSaveFailedData?.(err, form);
                    },
                })
            );
        }
    };

    const onSaveFail = (err) => {
        const action = isCreating ? "Thêm mới" : "Cập nhật";
        const errMsg = getSaveFailedMsg
            ? getSaveFailedMsg(err)
            : err?.message || `${action} ${objectName} thất bại. Vui lòng thử lại!`;
     
        saveErrorMsg ? showErrorMessage(saveErrorMsg) : showErrorMessage(errMsg);
        setIsSubmitting(false);
    };

    const onSaveSuccess = (data) => {
        if (onSaveSuccessProps) {
            return onSaveSuccessProps(data, {
                setIsSubmitting,
                setDetailData,
            });
        }

        const action = isCreating ? "Thêm mới" : "Cập nhật";
        setIsSubmitting(false);
        showSuccessMessage(`${action} ${objectName} thành công!`);

        if (!isCreating && isRefreshUpdateSuccess) {
            setDetailData(data);
        }

        if (isCreating && data.id) {
            navigate(listUrl);
        } else {
            navigate(-1);
        }
    };

    const onGetDetailFail = useCallback(
        (err) => {
            showErrorMessage(`Lấy dữ liệu thất bại. Vui lòng thử lại!`);
            navigate(listUrl);
        },
        [navigate, showErrorMessage, listUrl]
    );

    const renderActionButton = () => {
        if (disableActions) {
            return null;
        }

        const cancelButton = (
            <Button disabled={isSubmitting} onClick={onCancel}>
                Hủy
            </Button>
        );
        const submitButton = (
            <Button form={formId} type="primary" htmlType="submit" loading={isSubmitting}>
                {isCreating ? "Thêm mới" : "Cập nhật"}
            </Button>
        );

        const buttonConfig = {
            [DEFAULT_BUTTON_ACTIONS.CANCEL]: cancelButton,
            [DEFAULT_BUTTON_ACTIONS.SUBMIT]: submitButton,
        };

        const renderCustomActionsButton = (button) => {
            return actionButtons
                .map((button) => {
                    if (typeof button === "string") {
                        return buttonConfig[button] || null;
                    }

                    if (typeof button === "function") {
                        return button(form);
                    }

                    return button;
                })
                .filter(Boolean)
                .map((el, index) => <Fragment key={index}>{el}</Fragment>);
        };

        return (
            <div className={styles.actionBar}>
                {Array.isArray(actionButtons) ? (
                    renderCustomActionsButton()
                ) : (
                    <>
                        {extraActionButtons}
                        {cancelButton}
                        {submitButton}
                    </>
                )}
            </div>
        );
    };

    useEffect(() => {
        if (!isCreating && id && getDetailAction) {
            const handleGetDetailFail = restProps.onGetDetailFail || onGetDetailFail;
            dispatch(
                getDetailAction({
                    params: { id },
                    onCompleted: (response) => {
                        if (response?.result) {
                            const data = getDetailDataMapping ? getDetailDataMapping(response.data) : response.data;
                            setDetailData(data);
                        } else {
                            handleGetDetailFail(response);
                        }
                    },
                    onError: (err) => {
                        handleGetDetailFail(err);
                    },
                })
            );
        }
    }, [isCreating, id]);

    useEffect(() => {
        form.setFieldsValue(detailData);
    }, [form, detailData]);

    return (
        <PageWrapper breadcrumbs={breadcrumbs} tabs={tabs} onChangeTab={onChangeTab}>
            <div className={styles.savePage}>
                <div
                    className={classNames(styles.savePageForm, {
                        [styles.hasTabs]: tabs,
                        [styles.disableAction]: disableActions,
                        [styles.hasTabsDisableAction]: disableActions && tabs,
                    })}
                >
                    <Card style={{ borderRadius: 0, minHeight: "100%" }}>
                        {pageTitle && <h5 className={styles.pageTitle}>{pageTitle}</h5>}
                        <SaveForm
                            form={form}
                            formId={formId}
                            detailData={detailData}
                            isCreating={isCreating}
                            setDetailData={setDetailData}
                            onSubmit={isCreating ? onCreate : onUpdate}
                            {...formProps}
                        />
                    </Card>
                </div>
                {renderActionButton()}
            </div>
        </PageWrapper>
    );
};

SavePageContainer.DEFAULT_BUTTON_ACTIONS = DEFAULT_BUTTON_ACTIONS;

export default SavePageContainer;
