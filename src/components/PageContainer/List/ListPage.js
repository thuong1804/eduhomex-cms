import React, { useCallback, useRef, useState, useEffect } from "react";
import dayjs from "dayjs";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Col, Form, Row } from "antd";

import { DATE_FORMAT_VALUE, DATETIME_FORMAT_VALUE, fieldTypes } from "@/constants";
import { SearchForm } from "@/components";
import { dayjsUTC } from "@/utils/date";
import useQueryParams from "@/hooks/useQueryParams";

import { PlusOutlined } from "@ant-design/icons";

import styles from "./ListPage.module.scss";
import { cleanObject } from "@/utils";

const ListPageContext = React.createContext({});
const useListPageContext = () => React.useContext(ListPageContext);

const filterProps = (...props) => props.map((prop) => prop[0] ?? prop[1]);

const paginationDefault = {
    current: 1,
    pageSize: 10,
    total: 0,
};

const ListPage = ({
    filter: _filter,
    setFilter: _setFilter,
    getListAction,
    mappingGetListParams,
    onGetListSuccess,
    onGetListError,
    children,
    className,
    objectName = "",
    dataRowKey = "id",
    disablePagination,
}) => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useQueryParams();
    const [filter, setFilter] = filterProps(
        [_filter, searchParams],
        [_setFilter, setSearchParams]
    );
    const [list, setList] = useState([]);

    // const [_loading, _setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);

    const paginationRef = useRef(
        disablePagination ? { current: false } : paginationDefault
    );

    const setPagination = (newPagination) => {
        paginationRef.current = { ...paginationRef.current, ...newPagination };
    };

    const prepareGetListParams = useCallback(() => {
        let params = {
            ...filter,
            ...(!disablePagination
                ? {
                    page: paginationRef.current.current - 1,
                    size: paginationRef.current.pageSize,
                }
                : {}),
        };

        if (mappingGetListParams) {
            params = mappingGetListParams(params);
        }

        return params;
    }, [filter]);

    const getList = useCallback(() => {
        if (!getListAction) return;
        setPageLoading(true);
        dispatch(
            getListAction({
                params: prepareGetListParams(),
                onCompleted: (response) => {
                    if (response?.data) {
                        if (disablePagination) {
                            setList(response?.data || []);
                        } else {
                            const { content, totalElements } =
                                response?.data || {};
                            paginationRef.current.total = totalElements || 0;
                            setList(content || []);
                        }
                    }
                    onGetListSuccess?.(response);
                    setPageLoading(false);
                },
                onError: (err) => {
                    console.log(err);
                    setPageLoading(false);
                    onGetListError?.(err);
                },
            })
        );
    }, [prepareGetListParams]);

    useEffect(() => {
        if (!disablePagination) {
            paginationRef.current = {
                ...paginationRef.current,
                current: filter.page ?? paginationDefault.current,
                pageSize: filter.pageSize ?? paginationDefault.pageSize,
            };
        }

        getList();
    }, [filter]);

    return (
        <ListPageContext.Provider
            value={{
                list,
                setList,
                pagination: paginationRef.current,
                setPagination,
                filter,
                setFilter,
                loading: pageLoading,
                setLoading: setPageLoading,
                getList,
                objectName,
                dataRowKey,
            }}
        >
            <div className={classNames(styles.root, className)}>{children}</div>
        </ListPageContext.Provider>
    );
}

const Search = ({
    form,
    searchFields = [],
    className,
    onSearch,
    onReset,
    ...props
}) => {
    const [formInstance] = Form.useForm();
    const [searchForm] = filterProps([form, formInstance]);
    let { filter, setFilter } = useListPageContext();

    const handleSearch = (values) => {
        Object.keys(values).forEach((key) => {
            if (dayjs.isDayjs(values[key])) {
                if (key === "fromDate") {
                    values[key] = dayjsUTC(
                        dayjs(values[key]).startOf("date")
                    ).format(DATETIME_FORMAT_VALUE);
                } else if (key === "toDate") {
                    values[key] = dayjsUTC(
                        dayjs(values[key]).endOf("date")
                    ).format(DATETIME_FORMAT_VALUE);
                } else {
                    values[key] = dayjs(values[key]).format(
                        DATE_FORMAT_VALUE
                    );
                }
            } else {
                values[key] = values[key]?.toString()?.trim();
            }
        });
        onSearch?.(values);
        delete filter.page;
        delete filter.pageSize;

        setFilter((prev) => cleanObject({ ...prev, ...values }));
    };

    const handleResetSearch = () => {
        searchForm.resetFields();
        setFilter({});
        onReset?.();
    };

    useEffect(() => {
        if (searchFields?.length) {
            const searchFormValues = {};
            searchFields.forEach((searchField) => {
                const fieldValue = filter[searchField.key];
                if (
                    filter[searchField.key] &&
                    searchFormValues[searchField.key] !== fieldValue
                ) {
                    if (searchField.fieldType === fieldTypes.DATE) {
                        searchFormValues[searchField.key] = dayjs(fieldValue);
                        return;
                    }

                    if (
                        searchField.itemProps?.mode === "multiple" &&
                        [fieldTypes.AUTOCOMPLETE, fieldTypes.SELECT].includes(
                            searchField.fieldType
                        )
                    ) {
                        searchFormValues[searchField.key] = Array.isArray(
                            fieldValue
                        )
                            ? fieldValue.filter(Boolean)
                            : (fieldValue || "").split(",").filter(Boolean);
                        return;
                    }

                    searchFormValues[searchField.key] = Array.isArray(
                        fieldValue
                    )
                        ? fieldValue.toString()
                        : fieldValue;
                }
            });
            if (Object.keys(searchFormValues).length > 0) {
                searchForm.setFieldsValue(searchFormValues);
            }
        }
    }, [filter]);

    if (!searchFields?.length) return null;

    return (
        <SearchForm
            {...props}
            className={className}
            searchFields={searchFields}
            onSubmit={handleSearch}
            onResetForm={handleResetSearch}
            form={searchForm}
        />
    );
}

const Action = ({ createUrl, className, children }) => {
    const { objectName } = useListPageContext();

    return (
        <Row
            justify="end"
            gutter={16}
            className={classNames(styles.action, className)}
        >
            {!!createUrl && (
                <Col>
                    <Link to={createUrl}>
                        <Button type="primary">
                            <PlusOutlined /> Thêm {objectName}
                        </Button>
                    </Link>
                </Col>
            )}
            {children}
        </Row>
    );
}

const List = ({ children, className }) => {
    const { list, getList, loading, pagination, setFilter, dataRowKey } =
        useListPageContext();

    const handleTableChange = (pagination, filters, sorter) => {
        setFilter((prev) => ({
            ...prev,
            page: pagination.current,
            pageSize: pagination.pageSize,
        }));
    };

    const actionColumn = (renderButtons, config = {}) => ({
        title: "Thao tác",
        width: "100px",
        align: "center",
        ...config,
        render: (dataRow) => {
            return (
                <div className={styles.actionColumn}>
                    {renderButtons({ dataRow })}
                </div>
            );
        },
    });

    return (
        <div className={classNames(styles.list, className)}>
            {children({
                rowKey: dataRowKey,
                loading,
                dataSource: list,
                pagination,
                actionColumn,
                getList,
                onChange: handleTableChange,
            })}
        </div>
    );
}

ListPage.Search = Search;
ListPage.Action = Action;
ListPage.List = List;

export { useListPageContext };

export default ListPage;
