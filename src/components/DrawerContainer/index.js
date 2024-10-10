import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Checkbox, Col, Drawer, Form, Row, Table } from "antd";
import { useDispatch } from "react-redux";

import { SearchForm } from "@/components";
import { cleanObject } from "@/utils";
import EmptyData from "../Table/EmptyData";

import { PlusOutlined } from "@ant-design/icons";

import styles from "./index.module.scss";

const DrawerContainer = ({
    setKeySelected,
    keySelected,
    setSelected,
    selected,
    searchFields,
    columns,
    title,
    form,
    objectName = '',
    actionGetList,
    submitAction,
    mappingGetListParams,
    mappingRowDataProp,
    dataDetailChecked,
    customField,
    onOpenModalSuccess,
    onResetFormValue,
    customShowListSelectedAll,
    loading,
    ...props
}) => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [open, setOpen] = useState(false);
    const [filterPayload, setFilterPayload] = useState([]);
    const [data, setData] = useState([]);
    const [loadingTable, setLoadingTable] = useState(false);
    const [listSelecteds, setListSelecteds] = useState([]);
    const [isShowSelectedAll, setIsShowSelectedAll] = useState(false)
    const [seletedShowOnly, setSelectedShowOnly] = useState([])
    
    const selectedId = useMemo(() => {
        return seletedShowOnly.map(item => item.id);
    }, [seletedShowOnly]);

    const onResetForm = useCallback(() => {
        form.resetFields();
        setFilterPayload({});
        onResetFormValue?.(form);
        setCurrentPage(1);
    }, [form, onResetFormValue]);

    const onOpenModal = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setCurrentPage(1);
    };

    const rowSelection = {
        preserveSelectedRowKeys: true,
        selectedRowKeys: keySelected,
        onChange: (selectedRowKeys, selectedRows) => {
            setKeySelected(selectedRowKeys);
            if (selectedRows.length > 0) {
                const selectedPre = listSelecteds.filter(data => {
                    if (data.data === null || data.data?.length > 0) {
                        return selectedRowKeys.includes(data?.id)
                    } else {
                        return selectedRowKeys.includes(data.data?.id)
                    }
                })

                const selectedPreIds = selectedPre.map(item => {
                    if (item.data === null || item.data?.length > 0) {
                        return item.id
                    } else {
                        return item.data.id
                    }
                });

                const currentSelected = selectedRows.filter(item => {
                    return item !== undefined && !selectedPreIds.includes(item.id)
                });

                setSelected([...currentSelected, ...selectedPre]);
            } else {
                setSelected([]);
            }
        },
    };

    const handelTableChange = (pag) => {
        setCurrentPage(pag.current);
        setPageSize(pag.pageSize);
    };
    
    const handelClickRow = (rowData) => {
        const mappingRowData = mappingRowDataProp
            ? mappingRowDataProp(rowData)
            : rowData;
        const idRow = rowData.id;

        const updateSelection = () => {
            setKeySelected((pre) =>
                pre.includes(idRow)
                    ? pre.filter((id) => id !== idRow)
                    : [...pre, idRow]
            );
            setSelected((prevData) => {
                const index = (prevData || []).findIndex(
                    (data) => (data.data?.id || data.id) === rowData.id
                );
                return index > -1
                    ? (prevData || []).filter(
                          (data) => (data.data?.id || data.id) !== rowData.id
                      )
                    : [...(prevData || []), mappingRowData];
            });
        };

        return updateSelection();
    };

    const onSubmitSearch = (value) => {
        const cleanSubmitValue = cleanObject({ ...value });
        setFilterPayload(cleanSubmitValue);
        const filterParams = mappingGetListParams?.(value);
        if (mappingGetListParams) {
            setFilterPayload(filterParams);
        }
        setCurrentPage(1);
    };

    const handelShowListSelectedAll = () => {
        if (customShowListSelectedAll) {
            setSelectedShowOnly(customShowListSelectedAll)
        } else {
            const mappingList = listSelecteds.map(item => item.data || item)
            setSelectedShowOnly(mappingList)
        }
    }

    const onClickShowSelectedAll = (e) => {
        setCurrentPage(1);
        setIsShowSelectedAll(e.target.checked)
        handelShowListSelectedAll();
    }

    useEffect(() => {
        setLoadingTable(true);
        if (open) {
            dispatch(
                actionGetList({
                    params: {
                        page: currentPage - 1,
                        size: 10,
                        ...filterPayload,
                        selectedIds: isShowSelectedAll ? selectedId : []
                    },
                    onCompleted: (res) => {
                        setData(res.data || []);
                        setLoadingTable(false);
                    },
                    onError: (err) => {
                        console.log(err);
                    },
                })
            );
        }
    }, [open, filterPayload, currentPage, actionGetList, isShowSelectedAll, seletedShowOnly]);

    useEffect(() => {
        handelShowListSelectedAll()
    }, [actionGetList, open])
    
    useEffect(() => {
        if (open) {
            if (dataDetailChecked?.length > 0) {
                const dataDeTailIds = dataDetailChecked.map(item => item.data?.id || item.id)
                setKeySelected(dataDeTailIds)
                setSelected(dataDetailChecked);
            } 
            onOpenModalSuccess?.(open)
        }
    }, [open]);

    useEffect(() => {
        if (selected) setListSelecteds(selected);
    }, [selected])

    return (
        <React.Fragment>
            <Button type="primary" onClick={onOpenModal} loading={loading}>
               {loading ? 'Thêm mới tài nguyên ' : (<><PlusOutlined /> Thêm mới {objectName}</>)}
            </Button>
            <Drawer
                title={title}
                closable={false}
                onClose={onClose}
                open={open}
                height="100vh"
                footer={
                    <div className={styles.footerActions}>
                        <Button onClick={onClose}>Hủy</Button>
                        <Button
                            type="primary"
                            htmlType="button"
                            onClick={() => {
                                submitAction();
                                setCurrentPage(1);
                                setOpen(false);
                            }}
                        >
                            Chọn
                        </Button>
                    </div>
                }
                {...props}
            >
                <Row gutter={[16, 16]}>
                    {customField && (
                        <Form
                            form={form}
                        >
                            {customField()}
                        </Form>
                    )}
                    <Col span={24}>
                        <SearchForm
                            form={form}
                            searchFields={searchFields}
                            onSubmit={onSubmitSearch}
                            onResetForm={onResetForm}
                        />
                    </Col>
                    <Checkbox
                        checked={isShowSelectedAll}
                        onClick={onClickShowSelectedAll}>
                            Hiển thị tất cả {objectName} được chọn
                    </Checkbox>
                    <Col span={24}>
                        <Table
                            onChange={handelTableChange}
                            loading={loadingTable}
                            dataSource={(data.content || data)}
                            columns={columns}
                            onRow={(rowData) => ({
                                onClick: () => handelClickRow(rowData),
                            })}
                            locale={{
                                emptyText: <EmptyData />,
                            }}
                            rowSelection={{
                                type: "checkbox",
                                ...rowSelection,
                                hideSelectAll: false,
                            }}
                            pagination={{
                                current: currentPage,
                                total: data.totalElements,
                                pageSize: 10,
                            }}
                            rowKey={"id"}
                        />
                    </Col>
                </Row>
            </Drawer>
        </React.Fragment>
    );
};
export default DrawerContainer;
