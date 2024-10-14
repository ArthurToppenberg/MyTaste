import React from 'react';
import Image from "next/image";
import fonts from "@/styles/fonts.module.css";
import style from "@/styles/dashboardNavbar.module.css";

const DashboardNavbar: React.FC = () => {
    return (
        <div className={style.navbar_container}>
            <div className={style.navbar_logo_container}>
                <Image src="/images/logo.png" alt="Mytaste Logo" width={48} height={48} />
                <p className={`font-bold text-inherit ${fonts.logo}`}>My Taste</p>
            </div>
        </div>
    );
};

export default DashboardNavbar;