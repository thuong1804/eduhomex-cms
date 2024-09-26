import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import paths from '@/constants/paths';
import { MasterLayout, NotFound, PublicLayout } from '@/components';

import routes from './routes';
import useAuth from '../hooks/useAuth';
import { getRedirectUrlByRole } from "@/utils";

const RootRoutes = () => {
    const { isAuthenticated, userRole } = useAuth();
    console.log({routes})
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    exact element={
                        isAuthenticated
                            ? <Navigate to={getRedirectUrlByRole(userRole)} />
                            : window.location.replace(paths.login)
                    } 
                />
                {routes.map(route => {
                    const AppLayout = route.isPublic ? PublicLayout : MasterLayout;

                    if (!route.isPublic && !isAuthenticated) {
                        return (
                            <Route 
                                exact 
                                path={route.path} 
                                key={route.path} 
                                element={() => { window.location.replace(paths.login) }} 
                            />
                        )
                    }
                    return (
                        <Route
                            key={route.path}
                            exact
                            path={route.path}
                            element={
                                <AppLayout>
                                    <route.component />
                                </AppLayout>
                            }
                        />
                    );
                })}
                <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
            </Routes>
        </BrowserRouter>
    );
}

export default RootRoutes;
