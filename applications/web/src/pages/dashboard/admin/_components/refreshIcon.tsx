import React from 'react';
import Image from "next/image";
import style from '@/styles/icon.module.css';

export interface AddIconProps {
    inverted?: boolean;
}

const RefreshIcon: React.FC<AddIconProps> = ({ inverted }) => {
    return (
        <Image 
            src="/icons/refresh.png" 
            alt="Add Icon" 
            width={15} 
            height={15} 
            className={inverted ?  '' : style.inverted}
        />
    );
};

export default RefreshIcon;