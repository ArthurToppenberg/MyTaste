import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/styles/infobox.module.css';
import Image from 'next/image';

interface InfoBoxProps {
    text?: string;
    loading?: boolean;
    onClick?: () => void;
    inverted?: boolean; // Invert the color scheme
    invertOnHover?: boolean; // Invert the color scheme on hover
    invertOnClick?: boolean; // Invert the color scheme on click
    children?: React.ReactNode;
    imagePath?: string;
    noBorder?: boolean;
}

const InfoBox: React.FC<InfoBoxProps> = ({
    text,
    loading,
    onClick,
    inverted,
    invertOnHover,
    invertOnClick,
    children,
    imagePath,
    noBorder,
}) => {
    // State to track temporary color inversion for hover and click
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    // Determine the base container class (from the inverted prop)
    const baseClass = inverted ? 'bg-light text-dark' : `${styles.background_transparent} text-light`;

    // Apply inversion based on hover or click state
    const temporaryInversion = (hovered && invertOnHover) || (clicked && invertOnClick);
    const containerClass = temporaryInversion ? 'bg-light text-dark' : baseClass;

    // Handle mouse enter (hover)
    const handleMouseEnter = () => {
        if (invertOnHover) {
            setHovered(true);
        }
    };

    // Handle mouse leave (end hover)
    const handleMouseLeave = () => {
        setHovered(false);
        setClicked(false); // Reset clicked state after mouse leaves
    };

    // Handle click
    const handleClick = () => {
        if (invertOnClick) {
            setClicked(!clicked); // Toggle click state
        }
        if (onClick) {
            onClick(); // Trigger the provided onClick handler
        }
    };

    return (
        <div
            className={`rounded shadow-sm p-2 ${styles.container} ${containerClass} ${noBorder ? '' : 'border'}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status" />
                </div>
            ) : (
                <>
                    {text && <p className={`m-0`}>{text}</p>}
                    {imagePath && <Image src={imagePath} alt="info box image" width={100} height={100} />}
                    {children && <div>{children}</div>}
                </>
            )}
        </div>
    );
};

export default InfoBox;