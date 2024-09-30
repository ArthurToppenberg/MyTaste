import React, { useEffect, useState } from 'react';
import DropdownItem, { DropDownItemProps } from './dropdown_item';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/styles/dashboard_toolbar_dropdown.module.css';
import ReactDOM from 'react-dom';

export interface DashboardDropdownProps {
    name: string;
    itemsProps: DropDownItemProps[];
    defaultItem: number;
    hideSelection?: boolean;
}

const DashboardDropdown: React.FC<DashboardDropdownProps> = ({ name, itemsProps, defaultItem, hideSelection}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const dropdownRef = React.useRef<HTMLUListElement>(null);
    const [selectedItem, setSelectedItem] = useState<string>(itemsProps[defaultItem].name);

    const calculateDropdownPosition = () => {
        if (buttonRef.current && dropdownRef.current) {
            // Get the button's dimensions and position
            const buttonRect = buttonRef.current.getBoundingClientRect();
            
            // Set the position for the dropdown menu to align top-left corner with button's bottom-left
            setDropdownPosition({
                top: buttonRect.bottom, // Bottom of the button
                left: buttonRect.left, // Left-align the dropdown with the button
            });
        }
    };

    useEffect(() => {
        if (isOpen) {
            calculateDropdownPosition();
        }
    }, [isOpen]);

    // Recalculate dropdown position on window resize
    useEffect(() => {
        const handleResize = () => {
            if (isOpen) {
                calculateDropdownPosition();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup on component unmount
        };
    }, [isOpen]);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    const dropdownMenu = (
        <ul
            className={`dropdown-menu ${isOpen ? 'show' : ''}`}
            aria-labelledby="dropdownMenuButton"
            ref={dropdownRef}
            style={{
                position: 'absolute',
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                zIndex: 1050, // Bootstrap's default z-index for dropdowns
                display: isOpen ? 'block' : 'none',
            }}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
        >
            {itemsProps.map((props, index) => (
                <li key={index}>
                    <DropdownItem auxOnClick={() => {
                        if(defaultItem === undefined){
                            return;
                        }
                        setSelectedItem(itemsProps[index].name);
                        }} {...props}/>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="dashboard">
            <button
                className={`dropdown-toggle ${styles.custom_dropdown_button}`}
                onClick={handleClick}
                aria-expanded={isOpen}
                ref={buttonRef}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
            >
                {defaultItem === undefined || hideSelection ? name : `${name}: ${selectedItem}`}
            </button>
            {/* Render dropdown menu outside the current container */}
            {isOpen && ReactDOM.createPortal(dropdownMenu, document.body)}
        </div>
    );
};

export default DashboardDropdown;
