import React, { useEffect, useState } from "react";
import { Layout, Result, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import NavSider from "./NavSider";
import AppHeader from "./AppHeader";
import { setCookie } from "@/utils/localStorage";
import { accountActions } from "@/redux/actions";
import { useAuth, useCurrentPath } from "@/hooks";
import { storageKeys } from "@/constants";
import { getRedirectUrlByRole } from "@/utils";

import styles from "./index.module.scss";

const { Content } = Layout;

const MasterLayout = ({ children }) => {
    const dispatch = useDispatch();
    const [navSiderCollapsed, setNavSiderCollapsed] = useState(false);
    const { isAuthenticated, user, loading, logout, hasRoles, userRole } = useAuth();
    const currentRoute = useCurrentPath();
    const fullScreenLoading = useSelector((state) => state?.loading?.fullScreenLoading) || 0;
    const navigate = useNavigate();

    const onToggleNavSide = () => {
        setNavSiderCollapsed((prev) => !prev);
    };

    const canAccess = () => {
        if (currentRoute?.roles) {
            return hasRoles(currentRoute.roles);
        }
        return true;
    };

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(
                accountActions.getProfile({
                    onCompleted: (res) => {
                        dispatch(accountActions.updateProfileLocal(res));
                        const role = res.data.role;
                        if (!userRole) {
                            navigate(getRedirectUrlByRole(role.code));
                        }

                        setCookie(storageKeys.USER_ROLE, role.code, dayjs().add(7, "day").unix());
                    },
                    onError: (err) => {
                        console.log(err);
                    },
                })
            );
        }
    }, [dispatch, isAuthenticated]);

    if (!user) return null;

    return (
        <Spin size="large" spinning={fullScreenLoading > 0} className={styles.appLoading}>
            <Layout className={styles.masterLayout}>
                <NavSider
                    currentPathname={currentRoute.path}
                    navSiderCollapsed={navSiderCollapsed}
                    onToggleNavSide={onToggleNavSide}
                    hasRoles={hasRoles}
                />
                <Layout style={{ marginLeft: navSiderCollapsed ? 80 : 240 }}>
                    <AppHeader
                        navSiderCollapsed={navSiderCollapsed}
                        onLogout={logout}
                        onToggleNavSide={onToggleNavSide}
                        user={user}
                    />
                    <Content className={styles.appContent} id="main-layout">
                        <div className={styles.contentWrapper}>
                            {loading ? null : canAccess() ? (
                                children
                            ) : (
                                <Result
                                    status="403"
                                    title="403"
                                    subTitle="Sorry, you are not authorized to access this page."
                                />
                            )}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Spin>
    );
};

export default MasterLayout;
