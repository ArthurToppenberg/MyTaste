import React from 'react';
import { Button } from '@nextui-org/react';
import { useSidebarRouter } from '../_contexts/sidebarRouterContext';

interface SidebarButtonProps {
    name: string;
    tab?: string;
    onClick?: () => void;
    key?: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ name, onClick, tab, key }) => {
    const { setCurrentTab, currentTab } = useSidebarRouter();

    const isSelected = tab === currentTab;

    return (
        <Button
            onClick={() => {
            if (tab) {
                setCurrentTab(tab);
            }

            if (onClick) {
                onClick();
            }
            }}
            className={isSelected ? 'gray-background' : 'dark-background'}
            style={{fontSize: '1rem', justifyContent: 'flex-start'}}
        >
            {name}
        </Button>
    );
};

export default SidebarButton;