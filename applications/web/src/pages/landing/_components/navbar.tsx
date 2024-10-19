import {
    Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import fonts from "@/styles/fonts.module.css";
import { useAuthContext } from "@packages/authProvider";

import { AccountResponse } from "@packages/apiCommunicator/src/interactions/account";
import { useApiContext, ResponseType } from "@packages/apiCommunicator";

const NavBar: React.FC = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [account, setAccount] = useState<AccountResponse | null>(null);

    const { api_auth_account } = useApiContext();
    const { updateToken, token, logout } = useAuthContext();

    const handleNav = (path: string) => {
        router.push(path);
        setIsMenuOpen(false); // Close the menu when navigating
    };

    const centerNavigationLinks = [
        { label: "Home", path: "/" },
        { label: "About Us", path: "/" },
        { label: "Contact", path: "/" },
    ];

    const accountDropdownItems = [
        {
            label: "Admin Panel",
            onclick: () => handleNav('/dashboard/admin'),
            section: "dashboard",
            description: "Manage admin shit",
            type: "primary",
            show: () => account?.is_admin == true,
        },
        {
            label: "Restaurant",
            onclick: () => handleNav('/dashboard/restaurant'),
            section: "dashboard",
            description: "Manage your restaurant",
            type: "primary",
            show: () => account?.is_restaurant == true,
        },
        {
            label: "Mobile Account",
            onclick: () => handleNav('/dashboard/client'),
            section: "dashboard",
            description: "Manage your mobile account",
            type: "primary",
            show: () => account?.is_client == true,
        },
        {
            label: "Logout",
            onclick: () => {
                logout();
                setIsMenuOpen(false); // Close the menu after logout
            },
            section: "account",
            description: "Logout from your account",
            type: "danger",
            show: () => true,
        },
    ];

    useEffect(() => {
        const fetchAccount = async () => {
            const account: AccountResponse = await api_auth_account({});
            if (account.type === ResponseType.error) {
                setAccount(null);
                return;
            }
            if (account.type === ResponseType.ok && account.authed && account.token) {
                setAccount(account);
                updateToken(account.token);
            }
        };
        fetchAccount();
    }, [token, api_auth_account, updateToken]);

    const ProfileDropDown: React.FC = () => {
        return (
            <Dropdown>
                <DropdownTrigger>
                    <Button variant="bordered">
                        <p className={`${fonts.text}`} style={{ fontSize: '1rem', textAlign: "center" }}>Account</p>
                        <Image src="/icons/settings.png" alt="settings" width={18} height={18} style={{ filter: 'invert(1)' }} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions">
                    <DropdownSection title="Dashboard" showDivider >
                        {accountDropdownItems.filter((item) => item.section === "dashboard" && item.show()).map((item, index) => (
                            <DropdownItem
                                key={`${item.label}-${index}`}
                                color={item.type === "danger" ? "danger" : "primary"}
                                onClick={item.onclick}
                                description={item.description}
                            >
                                {item.label}
                            </DropdownItem>
                        ))}
                    </DropdownSection>
                    <DropdownSection title="Actions">
                        {accountDropdownItems.filter((item) => item.section === "account" && item.show()).map((item, index) => (
                            <DropdownItem
                                key={`${item.label}-${index}`}
                                color={item.type === "danger" ? "danger" : "default"}
                                onClick={item.onclick}
                                className={item.type === "danger" ? "text-danger" : ""}
                                description={item.description}
                            >
                                {item.label}
                            </DropdownItem>
                        ))}
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        );
    };

    return (
        <>
            <Navbar isBordered>
                {/* Navbar brand and logo */}
                <NavbarContent justify="start">
                    <NavbarBrand>
                        <Image src="/images/logo.png" alt="Mytaste Logo" width={48} height={48} />
                        <p className={`font-bold text-inherit ${fonts.logo}`} style={{ fontSize: '1.1rem' }}>My Taste</p>
                    </NavbarBrand>
                </NavbarContent>

                {/* Main navbar content - hidden on small screens */}
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    {centerNavigationLinks.map((item, index) => (
                        <NavbarItem key={`${item.path}-${index}`}>
                            <Link color="foreground" onClick={() => handleNav(item.path)}>
                                <p className={`${fonts.text}`}>{item.label}</p>
                            </Link>
                        </NavbarItem>
                    ))}
                </NavbarContent>

                {/* Buttons for login and signup or profile name - hidden on small screens */}
                <NavbarContent justify="end" className="hidden sm:flex">
                    {account ? (
                        <NavbarItem>
                            <ProfileDropDown key={'pcDropdown'} />
                        </NavbarItem>
                    ) : (
                        <>
                            <NavbarItem>
                                <Button color="primary" variant="flat" onClick={() => handleNav('/landing/login')}>
                                    Login
                                </Button>
                            </NavbarItem>
                            <NavbarItem>
                                <Button color="primary" variant="flat" onClick={() => handleNav('/landing/signup')}>
                                    Sign Up
                                </Button>
                            </NavbarItem>
                        </>
                    )}
                </NavbarContent>

                {/* Toggle for mobile menu - visible on small screens */}
                <NavbarContent className="flex sm:hidden" justify="end">
                    <NavbarMenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)} />
                </NavbarContent>

                {isMenuOpen && (
                    <NavbarMenu>
                        {centerNavigationLinks.map((item, index) => (
                            <NavbarMenuItem key={`${item.path}-mobile-${index}`}>
                                <Link color="foreground" onClick={() => handleNav(item.path)}>
                                    <p className={`${fonts.text}`}>{item.label}</p>
                                </Link>
                            </NavbarMenuItem>
                        ))}

                        {/* Mobile user options with dropdown */}
                        {account ? (
                            <NavbarMenuItem>
                                <ProfileDropDown key={'mobileDropdown'} />
                            </NavbarMenuItem>
                        ) : (
                            <>
                                <NavbarMenuItem>
                                    <Button color="primary" variant="flat" onClick={() => handleNav('/landing/login')}>
                                        Login
                                    </Button>
                                </NavbarMenuItem>
                                <NavbarMenuItem>
                                    <Button color="primary" variant="flat" onClick={() => handleNav('/landing/signup')}>
                                        Sign Up
                                    </Button>
                                </NavbarMenuItem>
                            </>
                        )}
                    </NavbarMenu>
                )}
            </Navbar>
        </>
    );
};

export default NavBar;
