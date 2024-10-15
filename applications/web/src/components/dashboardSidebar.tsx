import React from 'react';
import Image from "next/image";
import fonts from "@/styles/fonts.module.css";
import style from "@/styles/dashboardNavbar.module.css";
import SessionControll from './sessionControll';

interface DashboardNavbarProps {
    title: string;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ title }) => {
    return (
        <div className={style.navbar_container}>
            <div className={`${style.navbar_container_top}`}>
                <div className={style.navbar_logo_container}>
                    <Image src="/images/logo.png" alt="Mytaste Logo" width={48} height={48} />
                    <div className={style.navbar_logo_header_container}>
                        <h1 className={`font-bold text-inherit ${fonts.logo}`}>My Taste</h1>
                        <p className={`font-bold ${fonts.text}`}>{title}</p>
                    </div>
                </div>
            </div>

            <div className={style.navbar_container_bottom}>
                <SessionControll />
            </div>
        </div>
    );
};

export default DashboardNavbar;