import React from 'react';
import Image from "next/image";
import style from '@/styles/icon.module.css';

export interface AddIconProps {
    inverted?: boolean;
}

const AddIcon: React.FC<AddIconProps> = ({ inverted }) => {
    return (
        <Image 
            src="/icons/add.png" 
            alt="Add Icon" 
            width={15} 
            height={15} 
            className={inverted ?  '' : style.inverted}
        />
    );
};

export default AddIcon;