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

    // Log the initial setup to ensure the initial tab key is correct
    console.log("Initializing SidebarRouterProvider:", { initialTab, tabs });

    return (
        <SidebarRouterContext.Provider value={{ currentTab, setCurrentTab, tabs }}>
            {children}
        </SidebarRouterContext.Provider>
    );
};

export const SidebarRouter: React.FC = () => {
    const { currentTab, tabs } = useSidebarRouter();
    const activeTab = tabs.find(tab => tab.key === currentTab);

    // Log the current state for debugging
    console.log("Current Tab Key:", currentTab);
    console.log("Active Tab:", activeTab);

    return <>{activeTab?.component || <p style={{color: "white"}}>No active tab found</p>}</>;
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
