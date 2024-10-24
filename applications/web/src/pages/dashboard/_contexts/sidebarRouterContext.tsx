import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context and its props
interface SidebarRouterContextProps {
    currentTab: string;
    setCurrentTab: (tab: string) => void;
    tabs: { key: string; component: ReactNode }[];
}

const SidebarRouterContext = createContext<SidebarRouterContextProps | undefined>(undefined);

export const SidebarRouterProvider: React.FC<{ initialTab: string; tabs: { key: string; component: ReactNode }[]; children: ReactNode }> = ({ initialTab, tabs, children }) => {
    const [currentTab, setCurrentTab] = useState(initialTab);

    return (
        <SidebarRouterContext.Provider value={{ currentTab, setCurrentTab, tabs }}>
            {children}
        </SidebarRouterContext.Provider>
    );
};

export const SidebarRouter: React.FC = () => {
    const { currentTab, tabs } = useSidebarRouter();
    const activeTab = tabs.find(tab => tab.key === currentTab);

    return <>{activeTab?.component || <p style={{color: "white"}}>No tab defined</p>}</>;
};

export const useSidebarRouter = (): SidebarRouterContextProps => {
    const context = useContext(SidebarRouterContext);
    if (!context) {
        throw new Error('useSidebarRouter must be used within a SidebarRouterProvider');
    }
    return context;
};

// Default export
export default SidebarRouterProvider;
