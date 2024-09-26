import { useNotification } from "@/hooks";
import { useListPageContext } from "../ListPage";
import { Button, Modal, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

const { confirm } = Modal;

function DeleteAction({ dataRow, action, getMessages, ...props }) {
    const dispatch = useDispatch();
    const { objectName, pagination, getList, list, setFilter, dataRowKey } = useListPageContext();
    const { showErrorMessage, showSuccessMessage } = useNotification();
    const disabled = props.disabled;

    const defaultMessages = {
        deleteTitle: `Xác nhận xoá ${objectName}`,
        deleteContent: `Hệ thống sẽ xoá toàn bộ thông tin và nội dung ${objectName} này. Bạn có chắc chắn muốn tiếp tục?`,
        deleteSuccess: `Đã xoá thành công nội dung ${objectName}!`,
        deleteError: `Xóa nội dung ${objectName} thất bại. Vui lòng thử lại!`,
    };

    const handleDelete = () => {
        if (!action || disabled) return;
        const messages = getMessages ? getMessages(defaultMessages, dataRow) : defaultMessages;

        confirm({
            title: messages.deleteTitle,
            content: messages.deleteContent,
            okText: "Ok",
            cancelText: "Hủy",
            onOk: () => {
                dispatch(
                    action({
                        params: { id: dataRow[dataRowKey] },
                        onCompleted: () => {
                            showSuccessMessage(messages.deleteSuccess);
                            const isLastItem = list?.length === 1;
                            if (pagination.current > 1 && isLastItem) {
                                setFilter({ page: pagination.current - 1 });
                            } else {
                                getList();
                            }
                        },
                        onError: (err) => {
                            showErrorMessage(messages.deleteError);
                        },
                    })
                );
            },
            onCancel() {},
        });
    };

    return (
        <Tooltip title="Xóa">
            <Button
                {...props}
                onClick={handleDelete}
                type="link"
                icon={<DeleteOutlined style={{ color: "#ff4c4c" }} width={"20px"} height={"20px"} />}
            />
        </Tooltip>
    );
}

export default DeleteAction;
