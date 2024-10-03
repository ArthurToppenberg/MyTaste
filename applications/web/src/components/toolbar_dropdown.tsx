import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropDownItem, { DropDownItemProps } from './dropdown_item';
import styles from '@/styles/dropdown.module.css';

interface DropdownProps {
  buttonText: string;
  itemsProps: DropDownItemProps[];
}

const Dropdown: React.FC<DropdownProps> = ({ buttonText, itemsProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLUListElement>(null);

  const calculateDropdownPosition = () => {
    if (buttonRef.current && dropdownRef.current) {
      // Get the button's dimensions and position
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = dropdownRef.current.offsetWidth;

      // Set the position for the dropdown menu to align top-right corner with button's bottom-right
      setDropdownPosition({
        top: buttonRect.bottom, // Bottom of the button
        left: buttonRect.right - dropdownWidth, // Right-align the dropdown with the button
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {itemsProps.map((props, index) => (
        <li key={index}>
          <DropDownItem {...props} />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="dropdown"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`btn btn-secondary dropdown-toggle border rounded shadow-sm p-2 ${styles.custom_dropdown_menu}`}
        type="button"
        onClick={handleClick}
        aria-expanded={isOpen}
        ref={buttonRef}
      >
        {buttonText}
      </button>
      {/* Render dropdown menu outside the current container */}
      {isOpen && ReactDOM.createPortal(dropdownMenu, document.body)}
    </div>
  );
};

export default Dropdown;
