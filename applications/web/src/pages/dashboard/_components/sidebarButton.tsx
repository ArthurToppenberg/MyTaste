import React from 'react';
import { Button } from '@nextui-org/react';
import { useSidebarRouter } from '../_contexts/sidebarRouterContext';
import NextImage from 'next/image';

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
            style={{ fontSize: '0.9rem', alignContent: 'left', justifyContent: 'flex-start', paddingLeft: '0.5rem', marginTop: '0.5rem' }}
            startContent={
            <NextImage
            src="/icons/dropdown.png"
            alt="Arrow Right"
            width={16}
            height={16}
            style={{ filter: 'invert(1) brightness(0.5)', transform: 'rotate(-90deg)' }}
            />
            }
        >
            <p style={{filter: 'brightness(0.8)'}}>
            {name}
                </p>
        </Button>
    );
};

export default SidebarButton;