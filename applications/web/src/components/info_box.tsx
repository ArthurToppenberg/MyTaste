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
    smallSize?: boolean;
    padding_inline?: boolean;
}

/**
 * A simple info box component that can display text, loading spinner, or children components.
 * 
 * @param text The text to display in the info box
 * @param loading Whether to display a loading spinner
 * @param onClick The click handler for the info box
 * @param inverted Whether to invert the color scheme
 * @param invertOnHover Whether to invert the color scheme on hover
 * @param invertOnClick Whether to invert the color scheme on click
 * @param children The children components to display in the info box
 * @param imagePath The path to an image to display in the info box
 * @param noBorder Whether to remove the border from the info box
 * @param smallSize Whether to use small size for the info box
 * @param padding_inline The inline padding for the info box
 * 
 * @returns The info box component
 * 
 * @example
 * ```tsx
 * <InfoBox text="Hello, world!" />
 * ```
 *  
 */
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
    smallSize,
    padding_inline,
}) => {
    // State to track temporary color inversion for hover and click
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    // Determine the base container class (from the inverted prop)
    const baseClass = inverted ? 'bg-light text-dark' : `${styles.background_transparent} text-light`;

    // Apply inversion based on hover or click state
    const isInverted = inverted ? !((hovered && invertOnHover) || (clicked && invertOnClick)) : (hovered && invertOnHover) || (clicked && invertOnClick);
    const containerClass = isInverted ? 'bg-light text-dark' : `${styles.background_transparent} text-light`;

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
            className={`rounded ${noBorder ? '' : 'shadow-sm'} p-2 ${styles.container} ${containerClass} ${noBorder ? '' : 'border'} ${smallSize ? 'p-1' : ''} ${padding_inline ? 'px-3' : ''}`}
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
                    {text && <p className={`m-0 ${smallSize ? 'small' : ''}`}>{text}</p>}
                    {imagePath && <Image src={imagePath} alt="info box image" width={smallSize ? 50 : 100} height={smallSize ? 50 : 100} />}
                    {children && <div className={smallSize ? 'small' : ''}>{children}</div>}
                </>
            )}
        </div>
    );
};

export default InfoBox;
