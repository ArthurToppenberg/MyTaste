import React, { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, DropdownSection, Image } from '@nextui-org/react';
import NextImage from 'next/image';
import fonts from '@/styles/fonts.module.css';

interface NavigationDropdownProps {
    name: string;
    links: { name: string; url: string; }[];
}

const NavigationDropdown: React.FC<NavigationDropdownProps> = ({ name, links }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
    };

    return (
        <Dropdown isOpen={isOpen} onOpenChange={handleOpenChange}>
            <DropdownTrigger>
                <Button
                    className={fonts.text}
                    variant="light"
                    endContent={
                        <Image
                            as={NextImage}
                            src="/icons/dropdown.png"
                            alt="dropdown arrow"
                            width={12}
                            height={12}
                            style={{
                                filter: 'invert(1)',
                                transition: 'transform 0.3s ease', // Add smooth transition
                                transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', // Rotate on open
                            }}
                        />
                    }
                >
                    <p className={`${fonts.text}`} style={{ fontSize: '1rem', textAlign: 'center' }}>
                        {name}
                    </p>
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions">
                <DropdownSection title={name}>
                    {links.map((link, index) => (
                        <DropdownItem key={index} onClick={() => (window.location.href = link.url)}>
                            {link.name}
                        </DropdownItem>
                    ))}
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
};

export default NavigationDropdown;
