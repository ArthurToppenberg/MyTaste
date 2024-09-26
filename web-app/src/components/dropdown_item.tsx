import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface DropDownItemProps {
    name: string;
    onClick: () => void;
    auxOnClick?: () => void;
}

const DropDownItem: React.FC<DropDownItemProps> = ({ name, onClick, auxOnClick }) => {
    const handleClick = () => {
        onClick();
        if (auxOnClick) {
            auxOnClick();
        }
    };

    return (
        <a className="dropdown-item" href="#" onClick={handleClick}>
            {name}
        </a>
    );
};

export default DropDownItem;