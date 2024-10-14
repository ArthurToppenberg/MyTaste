import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip, DropdownSection } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import fonts from "@/styles/fonts.module.css";

import { getUser } from "@/utils/client/user";
import { IUser } from "@/pages/api/protected/user";

import { getRestaurant } from "@/utils/client/restaurant";
import { IRestaurant } from "@/pages/api/protected/restaurant";

import { getClient } from "@/utils/client/client";
import { IClient } from "@/pages/api/protected/client";

import { useAuthContext } from "@packages/authProvider";

const NavBar: React.FC = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNav = (path: string) => {
        router.push(path);
    };

    const authMenuItems = [
        { label: "Login", path: "/auth/login" },
        { label: "Sign Up", path: "/auth/signup" },
    ];

    const menuItems = [
        { label: "Home", path: "/" },
        { label: "About Us", path: "/about" },
        { label: "Contact", path: "/contact" },
    ];

    const { authedRequest, localDeleteToken, localGetToken } = useAuthContext();
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        getUser(authedRequest)
            .then((data) => {
                setUser(data);
            }).catch((error) => {
                console.warn(error);
            });
    }, []);

    const [profileDropdown, setProfileDropdown] = useState([{
        key: "logout",
        label: "Logout",
        onclick: async () => {
            await localDeleteToken();
            setUser(null);
        },
        description: "Logout from your account",
    }]);

    useEffect(() => {
        //if client exists, add profile to dropdown
        getRestaurant(authedRequest)
            .then((data) => {
                const restaurant: IRestaurant = data;
                setProfileDropdown((prevState) => [
                    {
                        key: "restaurant",
                        label: 'Restaurant',
                        onclick: async () => {
                            router.push('/protected/dashboard/restaurant');
                        },
                        description: `Manage ${restaurant.name}`,
                    },
                    ...prevState,
                ]);
            }).catch((error) => {
                console.warn(error);
            });


        //if restaurant exists, add restaurant to dropdown
        getClient(authedRequest)
            .then((data) => {
                const client: IClient = data;
                setProfileDropdown((prevState) => [
                    {
                        key: "account",
                        label: 'Account',
                        onclick: async () => {
                            router.push('/protected/dashboard/account');
                        },
                        description: `Manage ${client.name}'s account`,
                    },
                    ...prevState,
                ]);
            }).catch((error) => {
                console.warn(error);
            });

    }, []);

    const ProfileDropDown: React.FC = () => {
        return (
            <Dropdown>
                <DropdownTrigger>
                    <Button variant="bordered">
                        <p className={`${fonts.text}`}>{user?.email}</p>
                        <Image src="/icons/settings.png" alt="settings" width={18} height={18} style={{ filter: 'invert(1)' }} />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions">
                    <DropdownSection title="Dashboard" showDivider>
                        {profileDropdown.filter(item => item.key !== "logout").map((item) => (
                            <DropdownItem
                                key={item.key}
                                color="default"
                                onClick={item.onclick}
                                description={item.description}
                            >
                                <p className={`${fonts.text}`}>{item.label}</p>
                            </DropdownItem>
                        ))}
                    </DropdownSection>
                    <DropdownSection title="Actions">
                        {profileDropdown.filter(item => item.key === "logout").map((item) => (
                            <DropdownItem
                                key={item.key}
                                color="danger"
                                className="text-danger"
                                onClick={item.onclick}
                            >
                                <p className={`${fonts.text}`}>{item.label}</p>
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
                        <p className={`font-bold text-inherit ${fonts.logo}`}>My Taste</p>
                    </NavbarBrand>
                </NavbarContent>

                {/* Main navbar content - hidden on small screens */}
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    {menuItems.map((item, index) => (
                        <NavbarItem key={`${item.path}-${index}`}>
                            <Link color="foreground" onClick={() => handleNav(item.path)}>
                                <p className={`${fonts.text}`}>{item.label}</p>
                            </Link>
                        </NavbarItem>
                    ))}
                </NavbarContent>

                {/* Buttons for login and signup or profile name - hidden on small screens */}
                <NavbarContent justify="end" className="hidden sm:flex">
                    {user ? (
                        <NavbarItem>
                            <ProfileDropDown key={'pcDropdown'} />
                        </NavbarItem>
                    ) : (
                        <>
                            <NavbarItem>
                                <Button color="primary" variant="flat" onClick={() => handleNav('/auth/login')}>
                                    Login
                                </Button>
                            </NavbarItem>
                            <NavbarItem>
                                <Button color="primary" variant="flat" onClick={() => handleNav('/auth/signup')}>
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

                {/* Dropdown menu for small screens */}
                {isMenuOpen && (
                    <NavbarMenu>
                        {menuItems.map((item, index) => (
                            <NavbarMenuItem key={`${item.label}-${index}`}>
                                <Link
                                    color="foreground"
                                    href={item.path}
                                    size="lg"
                                    onClick={() => setIsMenuOpen(false)} // Close the menu after selection
                                >
                                    <p className={`${fonts.text}`}>{item.label}</p>
                                </Link>
                            </NavbarMenuItem>
                        ))}
                        {user ? (
                            <NavbarMenuItem>
                                <ProfileDropDown key={'mobileDropdown'} />
                            </NavbarMenuItem>
                        ) : (
                            authMenuItems.map((item, index) => (
                                <NavbarMenuItem key={`${item.label}-${index}`}>
                                    <Link
                                        color="foreground"
                                        href={item.path}
                                        size="lg"
                                        onClick={() => setIsMenuOpen(false)} // Close the menu after selection
                                    >
                                        <p className={`${fonts.text}`}>{item.label}</p>
                                    </Link>
                                </NavbarMenuItem>
                            ))
                        )}
                    </NavbarMenu>
                )}
            </Navbar>
        </>
    );
};

export default NavBar;
