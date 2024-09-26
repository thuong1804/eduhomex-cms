import paths from "@/constants/paths";
import ProfilePage from "@/containers/profile";
import Forbidden from "@/components/Forbidden";
import Eduhome from "@/containers/resource/EduHomeListPage";

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
    {
        path: paths.eduhomeList,
        component: Eduhome,
    },
];

export default routes;
