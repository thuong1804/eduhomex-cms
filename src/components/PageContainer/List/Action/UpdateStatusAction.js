import { useDispatch } from "react-redux";
import { Button, Tooltip, Modal } from "antd";

import { useListPageContext } from "../ListPage";
import { commonStatus } from "@/constants";
import { useNotification } from "@/hooks";

import { UnlockOutlined, LockOutlined } from "@ant-design/icons";

const { confirm } = Modal;

function UpdateStatusAction({ dataRow, onClick, action, getMessages, ...props }) {
    const dispatch = useDispatch();
    const { dataRowKey, objectName, getList } = useListPageContext();
    const { showSuccessMessage, showErrorMessage } = useNotification();
    const { status } = dataRow;

    const isActive = status === commonStatus.ACTIVE;
    const defaultMessages = {
        updateStatusTitle: `Bạn có chắc muốn ${status === commonStatus.ACTIVE ? "khóa" : "kích hoạt"} ${objectName} này?`,
        updateStatusSuccess: `${isActive ? "Khoá" : "Kích hoạt"} ${objectName} thành công!`,
        updateStatusError: `${isActive ? "Khoá" : "Kích hoạt"} ${objectName} thất bại. Vui lòng thử lại!`,
    }

    const messages = getMessages ? getMessages(defaultMessages, dataRow, isActive) : defaultMessages;

    const onConfirmUpdateStatus = (id) => {
        confirm({
            title: messages.updateStatusTitle,
            content: "",
            okText: "Xác nhận",
            okType: "danger",
            cancelText: "Hủy",
            onOk: () => {
                onUpdateStatus(id, status);
            },
            onCancel() {},
        });
    };

    const onUpdateStatus = (id) => {
        if (action) {
            dispatch(
                action({
                    params: {
                        id,
                        status: isActive ? commonStatus.LOCK : commonStatus.ACTIVE,
                    },
                    onCompleted: () => {
                        showSuccessMessage(messages.updateStatusSuccess)
                        getList();
                    },
                    onError: (err) => {
                        showErrorMessage(messages.updateStatusError);
                    },
                })
            );
        }
    };

    return (
        <Tooltip title="Cập nhật trạng thái">
            <Button
                {...props}
                type="link"
                icon={
                    dataRow.status === commonStatus.ACTIVE ? (
                        <LockOutlined />
                    ) : (
                        <UnlockOutlined style={{ color: "red" }} />
                    )
                }
                onClick={(e) => {
                    e.stopPropagation();
                    onConfirmUpdateStatus(dataRow[dataRowKey]);
                }}
            />
        </Tooltip>
    );
}

export default UpdateStatusAction;
