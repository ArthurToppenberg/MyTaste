import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface DropDownItemProps {
    name: string;
    action: () => void;
}

const DropDownItem: React.FC<DropDownItemProps> = ({ name, action }) => {
    return (
        <a className="dropdown-item" href="#" onClick={action}>
            {name}
          </a>
    );
};

export default DropDownItem;