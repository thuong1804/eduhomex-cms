import { useListPageContext } from "../ListPage";
import { Button, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function EditAction({ dataRow, onClick, detailUrl, ...props }) {
    const navigate = useNavigate();
    const { dataRowKey } = useListPageContext();

    return (
        <Tooltip title="Chỉnh sửa">
            <Button
                {...props}
                type="link"
                icon={<EditOutlined width={"20px"} height={"20px"} />}
                onClick={() => {
                    if (onClick) {
                        onClick(dataRow);
                    } else {
                        navigate(detailUrl.replace(":id", dataRow[dataRowKey]));
                    }
                }}
            ></Button>
        </Tooltip>
    );
}

export default EditAction;
