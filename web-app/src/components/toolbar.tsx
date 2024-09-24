import React, { ReactElement } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/styles/toolbar.module.css';

import ToolbarLink from './toolbar_link';

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
    //keep track of which tab is currently selected
    const [selectedTab, setSelectedTab] = React.useState<number>(0);

    return (
        <>
            <nav className={`toolbar navbar navbar-expand-lg navbar-light bg-light fixed-top ${styles.toolbar}`}>
                <div className="container-fluid">
                    <div className="d-flex flex-wrap mb-2">
                        {logo && <div className="me-2 mb-2">{logo}</div>}
                        {tabLinks.map((tabLink, index) => (
                            <div key={index} className="me-2 mb-2">
                                <ToolbarLink
                                    highlight={selectedTab === index}
                                    onClick={() => {setSelectedTab(index); setTab(tabLink.tab);}}
                                >
                                    {tabLink.name}
                                </ToolbarLink>
                            </div>
                        ))}
                    </div>
                    <div className={`d-flex ms-auto flex-wrap mb-2`}>
                        {elements.map((element, index) => (
                            <div key={index} className={`ms-2 mb-2`}>
                                {element}
                            </div>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Toolbar;
