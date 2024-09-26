import { ESSO_CLIENT_APP_ID, LOGIN_URL } from "@/constants/index";

const paths = {
    login: `${LOGIN_URL}?clientAppId=${ESSO_CLIENT_APP_ID}&returnUrl=${window.location.origin}`,
    forbidden: '/forbidden',
    profile: '/profile',
    eduhomeList: '/eduhome',
}
 
export default paths;