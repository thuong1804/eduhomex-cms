import { ListPageContainer } from "@/components";
import { fieldTypes} from "@/constants";
import { gradeActions, resourceActions, subjectActions} from "@/redux/actions";
import { eduhomeTypeDDL } from "@/constants/masterData";

import styles from "./Eduhome.module.scss";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { mappingDropdownData } from "@/utils";

const ListPage = () => {
    const dispatch = useDispatch();
    const [grades, setGrades] = useState([])
    const [subject, setSubject] = useState([])
    const [series, setSeries] = useState([])

   

    return (
        <ListPageContainer
            objectName="Eduhome"
            breadcrumbs={[
                {breadcrumbName: "Quản lý tài nguyên" },
                {breadcrumbName: 'Eduhome'}
            ]}
            columns={[
                { 
                    title: "ID", 
                    dataIndex: "id", 
                    width: '10%'
                },
                {
                    title: "Tên tài nguyên",
                    dataIndex: 'name',
                },
                {
                    title: "Loại tài nguyên",
                    dataIndex: "type",     
                    width: '20%'
                },
                {
                    title: "Chương trình sử dụng",
                    dataIndex: "series",
                    render: (series, data) => {
                        return (
                            <div className={styles.series}>
                                {series?.map(item => (
                                    <span>{item.name} - {item.grade}</span>
                                ))}
                            </div>
                        )
                    }     
                },
            ]}
            searchFields={[
                {
                    key: "name",
                    searchPlaceholder: "Tìm kiếm theo tài nguyên",
                    gridCol: 5,
                },
                {
                    key: "subjectId",
                    searchPlaceholder: "Môn học",
                    gridCol: 4,
                    fieldType: fieldTypes.SELECT,
                    options: mappingDropdownData(subject),
                },
                {
                    key: "gradeId",
                    searchPlaceholder: "Khối lớp",
                    gridCol: 4,
                    fieldType: fieldTypes.SELECT,
                    options: mappingDropdownData(grades),
                },
                {
                    key: "seriesId",
                    searchPlaceholder: "Chương trình",
                    gridCol: 4,
                    fieldType: fieldTypes.SELECT,
                    options: mappingDropdownData(series),
                },
                {
                    key: "type",
                    searchPlaceholder: "Loại tài nguyên",
                    gridCol: 4,
                    fieldType: fieldTypes.SELECT,
                    options: eduhomeTypeDDL,
                },
            ]}
            customColumnActionBar
            getListAction={resourceActions.getList}
        />
    );
};

export default ListPage;
