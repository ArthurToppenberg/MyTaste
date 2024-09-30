import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface DropDownItemProps {
    name: string;
    onClick: () => void;
    auxOnClick?: () => void;
    darker?: boolean;
}

const DropDownItem: React.FC<DropDownItemProps> = ({ name, onClick, auxOnClick, darker }) => {
    const handleClick = () => {
        onClick();
        if (auxOnClick) {
            auxOnClick();
        }
    };

    return (
        <a
            className={`dropdown-item`}
            style={{ backgroundColor: darker ? '#0000000f' : '' }}
            href="#"
            onClick={handleClick}
        >
            {name}
        </a>
    );
};

export default DropDownItem;