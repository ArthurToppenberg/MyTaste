import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Skeleton, Card } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import fonts from '@/styles/fonts.module.css';
import { useRouter } from "next/router";

import { AccountResponse } from "@packages/apiCommunicator/src/interactions/account";
import { useApiContext, ResponseType } from "@packages/apiCommunicator";
import { useAuthContext } from '@packages/authProvider';

interface AccountDropdownProps {
    noAccountFoundContent: React.ReactNode;
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({ noAccountFoundContent }) => {
    const router = useRouter();
    const handleNav = (path: string) => {
        router.push(path);
    };

    const [account, setAccount] = useState<AccountResponse | null>(null);
    const [loading, setLoading] = useState(true);

    const { api_auth_account } = useApiContext();
    const { token, logout } = useAuthContext();

    useEffect(() => {
        const fetchAccount = async () => {
            setLoading(true);
            const account: AccountResponse = await api_auth_account({});
            setLoading(false);

            if (account.type === ResponseType.error) {
                setAccount(null);
                return;
            }

            if (account.type === ResponseType.ok && account.authed && account.token) {
                setAccount(account);
            }
        };
        fetchAccount();
    }, [token, api_auth_account]);

    const accountDropdownItems = [
        {
            label: "Admin Panel",
            onclick: () => handleNav('/dashboard/admin'),
            section: "dashboard",
            description: "Manage admin stuff",
            type: "primary",
            show: () => account?.is_admin === true,
        },
        {
            label: "Restaurant",
            onclick: () => handleNav('/dashboard/restaurant'),
            section: "dashboard",
            description: "Manage your restaurant",
            type: "primary",
            show: () => account?.is_restaurant === true,
        },
        {
            label: "Mobile Account",
            onclick: () => handleNav('/dashboard/client'),
            section: "dashboard",
            description: "Manage your mobile account",
            type: "primary",
            show: () => account?.is_client === true,
        },
        {
            label: "Logout",
            onclick: () => {
                logout();
            },
            section: "account",
            description: "Logout from your account",
            type: "danger",
            show: () => true,
        },
    ];

    return (
        <>
            {loading ? (
                <Card className="w-[100px] space-y-5 p-4" radius="lg">
                    <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                    </div>
                </Card>
            ) : !account ? (
                <>{noAccountFoundContent}</>
            ) : (
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="light">
                            <p className={`${fonts.text}`} style={{ fontSize: '1rem', textAlign: "center" }}>Account</p>
                            <Image src="/icons/settings.png" alt="settings" width={14} height={14} style={{ filter: 'invert(1)' }} />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions">
                        <DropdownSection title="Dashboard" showDivider>
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
            )}
        </>
    );
};

export default AccountDropdown;
