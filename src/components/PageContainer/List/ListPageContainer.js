import { BaseTable } from "@/components/Table";
import ListPage from "./ListPage";
import PageWrapper from "@/components/PageWrapper";
import EditAction from "./Action/EditAction";
import DeleteAction from "./Action/DeleteAction";
import UpdateStatusAction from "./Action/UpdateStatusAction";

const ListPageContainer = ({
    objectName,
    columns,
    breadcrumbs,
    disablePagination,
    dataRowKey = "id",
    actionBar = {},
    detailUrl,
    createUrl,
    searchFields,
    mappingSearchParams,
    getListAction,
    deleteAction,
    updateStatusAction,
    onResetSearchParams,
    extraActions,
    Table = BaseTable,
    onGetListError,
    onGetListSuccess,
    classNames = {},
    searchForm,
    tableProps = {},
    getMessages,
}) => {
    const prepareColumns = (columns, actionColumn) => {
        if (Object.keys(actionBar).length) {
            return [
                ...columns,
                actionColumn(({ dataRow }) => {
                    const actionColumns = [];
                    if (actionBar.isEdit) {
                        actionColumns.push(
                            <EditAction
                                key={1}
                                dataRow={dataRow}
                                detailUrl={detailUrl}
                            />
                        );
                    }
                    if (actionBar.isStatus) {
                        actionColumns.push(
                            <UpdateStatusAction
                                key={3}
                                dataRow={dataRow}
                                action={updateStatusAction}
                                getMessages={getMessages}
                            />
                        );
                    }
                    if (actionBar.isDelete) {
                        actionColumns.push(
                            <DeleteAction
                                key={2}
                                dataRow={dataRow}
                                action={deleteAction}
                                getMessages={getMessages}
                            />
                        );
                    }
                    if (extraActions?.length) {
                        actionColumns.push(
                            ...extraActions.map((render) => render(dataRow))
                        );
                    }
                    return actionColumns;
                }),
            ];
        }
        return columns;
    };

    return (
        <PageWrapper breadcrumbs={breadcrumbs}>
            <ListPage
                objectName={objectName}
                getListAction={getListAction}
                mappingGetListParams={mappingSearchParams}
                className={classNames}
                dataRowKey={dataRowKey}
                onGetListError={onGetListError}
                disablePagination={disablePagination}
                onGetListSuccess={onGetListSuccess}
            >
                <ListPage.Search
                    searchFields={searchFields}
                    onReset={onResetSearchParams}
                    form={searchForm}
                />
                <ListPage.Action createUrl={createUrl} />
                <ListPage.List>
                    {({ actionColumn, ...props }) => {
                        return (
                            <Table
                                {...props}
                                columns={prepareColumns(columns, actionColumn)}
                                {...tableProps}
                            />
                        );
                    }}
                </ListPage.List>
            </ListPage>
        </PageWrapper>
    );
};

export default ListPageContainer;
