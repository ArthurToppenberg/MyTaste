import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import fonts from "@/styles/fonts.module.css";

const NavBar: React.FC = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNav = (path: string) => {
        router.push(path);
    };

    const menuItems = [
        { label: "Home", path: "/" },
        { label: "About Us", path: "/about" },
        { label: "Contact", path: "/contact" },
        { label: "Login", path: "/auth/login" },
        { label: "Sign Up", path: "/auth/signup" },
    ];

    return (
        <>
            <Navbar
                isBordered
            >
                {/* Navbar brand and logo */}
                <NavbarContent justify="start">
                    <NavbarBrand>
                        <img src="/images/logo.png" alt="Mytaste Logo" className="h-12 w-auto" />
                        <p className={`font-bold text-inherit ${fonts.logo}`}>My Taste</p>
                    </NavbarBrand>
                </NavbarContent>

                {/* Main navbar content - hidden on small screens */}
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    {menuItems.slice(0, 3).map((item) => (
                        <NavbarItem key={item.path}>
                            <Link color="foreground" onClick={() => handleNav(item.path)}>
                                {item.label}
                            </Link>
                        </NavbarItem>
                    ))}
                </NavbarContent>

                {/* Buttons for login and signup - hidden on small screens */}
                <NavbarContent justify="end" className="hidden sm:flex">
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
                </NavbarContent>

                {/* Toggle for mobile menu - visible on small screens */}
                <NavbarContent className="flex sm:hidden" justify="end">
                    <NavbarMenuToggle
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />
                </NavbarContent>

                {/* Dropdown menu for small screens */}
                {isMenuOpen && (
                    <NavbarMenu>
                        {menuItems.map((item, index) => (
                            <NavbarMenuItem key={`${item.label}-${index}`}>
                                <Link
                                    className="w-full"
                                    color="foreground"
                                    href={item.path}
                                    size="lg"
                                    onClick={() => setIsMenuOpen(false)} // Close the menu after selection
                                >
                                    {item.label}
                                </Link>
                            </NavbarMenuItem>
                        ))}
                    </NavbarMenu>
                )}
            </Navbar>
        </>
    );
};

export default NavBar;
