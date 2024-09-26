import { useDispatch } from "react-redux";
import { Button, Tooltip, Modal } from "antd";

import { useListPageContext } from "../ListPage";
import { commonStatus } from "@/constants";
import { useNotification } from "@/hooks";

import { UnlockOutlined, LockOutlined } from "@ant-design/icons";

const { confirm } = Modal;

function UpdateStatusAction({ dataRow, onClick, action, showToastCustom, ...props }) {
    const dispatch = useDispatch();
    const { dataRowKey, objectName, getList } = useListPageContext();
    const { showSuccessMessage, showErrorMessage } = useNotification();
    const { status } = dataRow;

    const onConfirmUpdateStatus = (id) => {
        confirm({
            title: `Bạn có chắc muốn ${status === commonStatus.ACTIVE ? "khóa" : "kích hoạt"} ${objectName} này?`,
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
            const isActive = status === commonStatus.ACTIVE;
            dispatch(
                action({
                    params: {
                        id,
                        status: isActive ? commonStatus.LOCK : commonStatus.ACTIVE,
                    },
                    onCompleted: () => {
                        showToastCustom ? (
                            showSuccessMessage(showToastCustom)
                        ) : (
                            showSuccessMessage(`${isActive ? "Khoá" : "Kích hoạt"} ${objectName} thành công!`)
                        )
                        getList();
                    },
                    onError: (err) => {
                        showErrorMessage(
                            `${isActive ? "Khoá" : "Kích hoạt"} ${objectName} thất bại. Vui lòng thử lại!`
                        );
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
