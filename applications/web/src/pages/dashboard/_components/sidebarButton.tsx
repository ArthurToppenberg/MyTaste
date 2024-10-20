import React from 'react';
import { Button } from '@nextui-org/react';
import { useSidebarRouter } from '../_contexts/sidebarRouterContext';

interface SidebarButtonProps {
    name: string;
    tab?: string;
    onClick?: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ name, onClick, tab }) => {
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
            style={{fontSize: '1rem', alignContent: 'left', justifyContent: 'flex-start'}}
        >
            {name}
        </Button>
    );
};

export default SidebarButton;