import paths from "@/constants/paths";
import ProfilePage from "@/containers/profile";
import Forbidden from "@/components/Forbidden";

const routes = [
    {
        path: paths.forbidden,
        component: Forbidden,
        isPublic: true,
    },
    {
        path: paths.profile,
        component: ProfilePage,
    },
];

export default routes;
