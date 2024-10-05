import React, { ReactElement, useRef } from 'react';
import style from '@/styles/dashboard.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToolBar from '@/components/dashboard_toolbar';

export interface IDashboard {
    refresh: () => void;
    search?: (query: string, filters: string[]) => void;
}

interface DashboardDisplaySelectionProps {
    name: string;
    displayComponent: ReactElement;
}

interface DashboardProps {
    selectionDropdownName: string;
    defaultDisplayComponent?: number;
    dashboardDisplaySelectionProps: DashboardDisplaySelectionProps[];
}

const Dashboard: React.FC<DashboardProps> = ({
    selectionDropdownName,
    dashboardDisplaySelectionProps,
    defaultDisplayComponent = 0,
}: DashboardProps) => {
    const [activeDashboardDisplay, setActiveDashboardDisplay] = React.useState<number>(defaultDisplayComponent);
    const activeDashboardDisplayRef = useRef<IDashboard>(null);
    const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);
    const [searchFilters, setSearchFilters] = React.useState<string[]>([]);

    const handleReload = React.useCallback(() => {
        if (activeDashboardDisplayRef.current) {
            // refresh animation
            setIsRefreshing(true);
            setTimeout(() => {
                setIsRefreshing(false);
            }, 500);
            activeDashboardDisplayRef.current.refresh();
        }
    }, [activeDashboardDisplayRef]);

    const handleSearch = React.useCallback(
        (query: string) => {
            // refresh animation
            setIsRefreshing(true);
            setTimeout(() => {
                setIsRefreshing(false);
            }, 500);
            if (activeDashboardDisplayRef.current) {
                if (query === '') {
                    activeDashboardDisplayRef.current.refresh();
                    return;
                }
                if (!activeDashboardDisplayRef.current.search) {
                    return;
                }
                if (searchFilters.length === 0) {
                    alert('Please select at least 1 filter');
                    return;
                }
                activeDashboardDisplayRef.current.search(query, searchFilters);
            }
        },
        [searchFilters, activeDashboardDisplayRef]
    );

    const handleFilterChange = React.useCallback((selectedItems: string[]) => {
        setSearchFilters(selectedItems);
    }, []);

    return (
        <div className={style.container}>
            <ToolBar
                isRefreshing={isRefreshing}
                onReload={handleReload}
                dashboardSelectionDropdownProps={{
                    name: selectionDropdownName,
                    defaultItem: defaultDisplayComponent,
                    itemsProps: dashboardDisplaySelectionProps.map((selectionProp, index) => {
                        return {
                            name: selectionProp.name,
                            onClick: () => {
                                setActiveDashboardDisplay(index);
                            },
                        };
                    }),
                }}
                // If the active dashboard display onSearch is not undefined, then display the search bar in the toolbar
                searchbarProps={
                    dashboardDisplaySelectionProps[activeDashboardDisplay].displayComponent.props.onSearch !==
                    undefined
                        ? {
                              placeholder: 'Search...',
                              isRefreshing: isRefreshing,
                              onSearch: handleSearch,
                          }
                        : undefined
                }
                filtersProps={{
                    onFilterChange: handleFilterChange,
                    ...dashboardDisplaySelectionProps[activeDashboardDisplay].displayComponent.props.filterProps,
                }}
            />
            {activeDashboardDisplay === -1 ? (
                <div>Loading...</div>
            ) : (
                <RenderDashboardDisplayComponent
                    displayComponent={dashboardDisplaySelectionProps[activeDashboardDisplay].displayComponent}
                    injectRef={activeDashboardDisplayRef}
                />
            )}
        </div>
    );
};

function RenderDashboardDisplayComponent({
    displayComponent,
    injectRef,
}: {
    displayComponent: ReactElement;
    injectRef: React.Ref<IDashboard>;
}): ReactElement {
    const Component = displayComponent.type;

    // Forward the ref only if it's necessary
    return <Component {...displayComponent.props} ref={injectRef} />;
}

export default Dashboard;
