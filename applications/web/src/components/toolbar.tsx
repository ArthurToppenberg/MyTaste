import React, { ReactElement, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/styles/toolbar.module.css';
import InfoBox from './info_box';

interface tabLinks {
    name: string;
    tab: React.ReactElement;
}

/**
 * Toolbar component
 * @param logo - Logo to display on the left side of the toolbar
 * @param tabLinks - Array of tab links to display on the toolbar
 * @param elements - Array of elements to display on the right side of the toolbar
 * @param setTab - Function to set the tab to display
 * @param hideTabLinkButtons - Boolean to hide the tab link buttons
 * @param showTabLinkButtonsOnHover - Boolean to show the tab link buttons on hover (Hover over the left division of the toolbar where the buttons are)
 * 
 * @returns Toolbar component
 */
interface ToolbarProps {
    logo?: React.ReactElement;
    tabLinks: tabLinks[];
    hideTabLinkButtons?: boolean;
    showTabLinkButtonsOnHover?: boolean;
    elements: React.ReactElement[];
    setTab: (tab: ReactElement) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ logo, tabLinks, elements, setTab, hideTabLinkButtons, showTabLinkButtonsOnHover }) => {
    const [hover, setHover] = useState(false);

    return (
        <>
            <nav className={`toolbar navbar navbar-expand-lg fixed-top ${styles.toolbar}`}>
                <div className="container-fluid"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <div className="d-flex flex-wrap align-items-center mb-2">
                        {logo && <div className="me-2 mb-2">{logo}</div>}
                        {(!hideTabLinkButtons || (showTabLinkButtonsOnHover && hover)) && tabLinks.map((tabLink, index) => (
                            <div key={index} className="me-2 mb-2">
                                <InfoBox
                                    onClick={() => { setTab(tabLink.tab); }}
                                    text={`${tabLink.name}`}
                                    invertOnHover={true}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={`d-flex ms-auto flex-wrap mb-2`}>
                        {elements.map((element, index) => (
                            element.type !== React.Fragment ? (
                                <div key={index} className={`ms-2 mb-2`}>
                                    {element}
                                </div>
                            ) : null
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Toolbar;
