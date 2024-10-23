import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenuItem,
    NavbarMenu,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    Image,
} from "@nextui-org/react";
import NextImage from "next/image";

import { useRouter } from "next/router";
import React, { useState } from "react";
import fonts from "@/styles/fonts.module.css";

import NavigationDropdown from "./navigationDropdown";
import AccountDropdown from "./accountDropdown";

const NavBar: React.FC = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNav = (path: string) => {
        router.push(path);
        setIsMenuOpen(false); // Close the menu when navigating
    };

    const centerNavigationLinks = [
        { label: "Home", path: "/" },
        {
            label: "Services",
            path: "/",
            component: <NavigationDropdown name="Services" links={[
                { name: "Link 1", url: "/"},
                { name: "Link 2", url: "/"},
            ]} />
        },
        { label: "About Us", path: "/" },
        { label: "Contact", path: "/" }
    ];

    return (
        <>
            <Navbar isBordered style={{position: 'fixed'}}>
                {/* Navbar brand and logo */}
                <NavbarContent justify="start">
                    <NavbarBrand>
                        <Image as={NextImage} src="/images/logo.png" alt="Mytaste Logo" width={48} height={48} />
                        <p className={`font-bold text-inherit ${fonts.logo}`} style={{ fontSize: '1.1rem' }}>My Taste</p>
                    </NavbarBrand>
                </NavbarContent>

                {/* Main navbar content - hidden on small screens */}
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    {centerNavigationLinks.map((item, index) => (
                        <NavbarItem key={`${item.path}-${index}`}>
                            {item.component ? (
                                item.component
                            ) : (
                                <Button
                                    className={fonts.text}
                                    variant="light"
                                >
                                    <p className={`${fonts.text}`} style={{ fontSize: '1rem', textAlign: 'center' }}>
                                        {item.label}
                                    </p>
                                </Button>
                            )}
                        </NavbarItem>
                    ))}
                </NavbarContent>

                {/* Buttons for login and signup or profile name - hidden on small screens */}
                <NavbarContent justify="end" className="hidden sm:flex">
                    <AccountDropdown
                        noAccountFoundContent={
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
                        }
                    />
                </NavbarContent>

                {/* Toggle for mobile menu - visible on small screens */}
                <NavbarContent className="flex sm:hidden" justify="end">
                    <NavbarMenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)} />
                </NavbarContent>

                {isMenuOpen && (
                    <NavbarMenu>
                        {centerNavigationLinks.map((item, index) => (
                            <NavbarMenuItem key={`${item.path}-mobile-${index}`}>
                                {item.component ? (
                                    item.component
                                ) : (
                                    <Link color="foreground" onClick={() => handleNav(item.path)}>
                                        <p className={`${fonts.text}`}>{item.label}</p>
                                    </Link>
                                )}
                            </NavbarMenuItem>
                        ))}

                        {/* Mobile user options with dropdown */}
                        <AccountDropdown
                            noAccountFoundContent={
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
                            }
                        />
                    </NavbarMenu>
                )}
            </Navbar>
        </>
    );
};

export default NavBar;
