import React from 'react';
import Image from "next/image";
import Fonts from "@/styles/fonts.module.css";
import style from "@/styles/dashboardSidebar.module.css";
import { useRouter } from 'next/router';
import { Tooltip } from '@nextui-org/react';

interface DashboardNavbarProps {
    title: string;
    children?: React.ReactNode;
}

const Sidebar: React.FC<DashboardNavbarProps> = ({ title, children }) => {
    const router = useRouter();

    return (
        <div className={`${style.navbar_container} ${Fonts.text_ui}`}>
            <div className={`${style.navbar_container_top}`} onClick={() => router.push('/')}>
                <Tooltip
                    content="Go to Home"
                >
                    <div className={style.navbar_logo_container}>
                        <Image src="/images/logo.png" alt="Mytaste Logo" width={48} height={48} />
                        <div className={style.navbar_logo_header_container}>
                            <h1 className={`font-bold text-inherit ${Fonts.logo}`}>My Taste</h1>
                            <p className={`font-bold ${Fonts.text}`}>{title}</p>
                        </div>
                    </div>
                </Tooltip>
            </div>

            <div className={style.navbar_container_middle}>
                {children}
            </div>

            <div className={style.navbar_container_bottom}>

            </div>
        </div>
    );
};

export default Sidebar;