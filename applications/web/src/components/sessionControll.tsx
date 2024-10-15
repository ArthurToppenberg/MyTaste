import React, { useEffect } from 'react';
import { Image, Card, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Spinner } from '@nextui-org/react';

import { useAuthContext } from '@packages/authProvider';

import { getUser } from "@/utils/client/user";
import { IUser } from "@/pages/api/protected/user";

import { useRouter } from 'next/router';

const SessionControll: React.FC = () => {
    const { localDeleteToken, authedRequest } = useAuthContext();
    const [user, setUser] = React.useState<IUser | null>(null);

    const router = useRouter();

    const [dropdown] = React.useState([
        {
            key: "home",
            label: "Home",
            onclick: async () => {
                router.push("/");
            },
            description: "Navigate back to home page",
        },
        {
            key: "logout",
            label: "Logout",
            onclick: async () => {
                await localDeleteToken();
                router.push("/auth/login");
            },
            description: "Logout from your account",
        },
    ]);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser(authedRequest);
            setUser(user);
        };
        fetchUser();
    }, [authedRequest]);

return (
    <Dropdown>
        <DropdownTrigger>
            <Card className="max-w-[400px]" style={{ borderRadius: 0 }}>
                <CardHeader className="flex gap-3">
                    <Image
                        alt="nextui logo"
                        height={40}
                        radius="sm"
                        src="/icons/profile.png"
                        width={40}
                        style={{ filter: 'invert(1) brightness(0.6)' }}
                    />
                    <div className="flex flex-col">
                        <p className="text-md">Manage</p>

                        {user ? (
                            <p className="text-small text-default-500" style={{ maxWidth: '10rem', fontSize: 'calc(20rem / ' + user.email.length + ')' }}>
                                {user.email}
                            </p>
                        ) : (
                            <Spinner size="sm" />
                        )}
                    </div>
                </CardHeader>
            </Card>
        </DropdownTrigger>
        <DropdownMenu>
            <DropdownSection title="Navigation">
                {dropdown.filter(item => item.key !== "logout").map((item) => (
                    <DropdownItem
                        key={item.key}
                        description={item.description}
                        onClick={item.onclick}
                    >
                        {item.label}
                    </DropdownItem>
                ))}
            </DropdownSection>
            <DropdownSection title="Actions">
                {dropdown.filter(item => item.key === "logout").map((item) => (
                    <DropdownItem
                        key={item.key}
                        description={item.description}
                        onClick={item.onclick}
                        color="danger"
                        className="text-danger"
                    >
                        {item.label}
                    </DropdownItem>
                ))}
            </DropdownSection>
        </DropdownMenu>
    </Dropdown>
);
};

export default SessionControll;