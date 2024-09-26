import React from "react";

import paths from "./paths";
import schoolIcon from "@/assets/images/school.svg";

const navMenuConfig = [
    {
        label: "Eduhome",
        icon: <img src={schoolIcon} alt="" width={20}/>,
        path: paths.eduhomeList,
    },
];

export default navMenuConfig;
