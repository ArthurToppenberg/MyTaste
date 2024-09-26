import React, { ReactElement } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/styles/toolbar.module.css';
import InfoBox from './info_box';

interface tabLinks {
    name: string;
    tab: React.ReactElement;
}

interface ToolbarProps {
    logo?: React.ReactElement;
    tabLinks: tabLinks[];
    elements: React.ReactElement[];
    setTab: (tab: ReactElement) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ logo, tabLinks, elements, setTab}) => {
    return (
        <>
            <nav className={`toolbar navbar navbar-expand-lg fixed-top ${styles.toolbar}`}>
                <div className="container-fluid">
                    <div className="d-flex flex-wrap mb-2">
                        {logo && <div className="me-2 mb-2">{logo}</div>}
                        {tabLinks.map((tabLink, index) => (
                            <div key={index} className="me-2 mb-2">
                                <InfoBox
                                    onClick={() => {setTab(tabLink.tab);}}
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
