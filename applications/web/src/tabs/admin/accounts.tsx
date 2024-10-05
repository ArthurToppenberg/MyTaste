import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import tabStyles from '@/styles/tab.module.css';
import Dashboard from '@/components/dashboard';
import Table, { DashboardTableData, DashboardTableRowProps } from '@/components/dashboard_table';
import { getUsers } from '../../utils/client/users';
import { IUsers, IUsersResponse } from '@/pages/api/protected/admin/users';
import { useAuthContext } from '@packages/authProvider';

const Accounts: React.FC = () => {
    const { authedRequest } = useAuthContext();

    const onReachEnd = React.useCallback(async (index: number): Promise<DashboardTableData> => {
        try {
            const response: IUsersResponse = await getUsers(authedRequest, {
                simpleList: {
                    index: index,
                    limit: 10,
                },
            });

            if (response.users === undefined) {
                return { tableRowProps: [], message: response.message };
            }

            const users: IUsers = { users: response.users };

            const rows: DashboardTableRowProps[] = users.users.map(user => ({
                rowData: [
                    user.id.toString(),
                    user.profile?.name || '',
                    user.email,
                    user.permission,
                    user.type,
                ],
            }));

            return { tableRowProps: rows, hasReachedEnd: response.hasReachedEnd };
        } catch (error) {
            return { tableRowProps: [], message: 'Error fetching users' };
        }
    }, [authedRequest]);

    const onSearch = React.useCallback(async (query: string, filters: string[]): Promise<DashboardTableData> => {
        try {
            const response: IUsersResponse = await getUsers(authedRequest, {
                search: {
                    query: query,
                    count: 10,
                    field: filters,
                },
            });

            if (response.users === undefined) {
                return { tableRowProps: [], message: response.message };
            }

            const users: IUsers = { users: response.users };

            const rows: DashboardTableRowProps[] = users.users.map(user => ({
                rowData: [
                    user.id.toString(),
                    user.profile?.name || '',
                    user.email,
                    user.permission,
                    user.type,
                ],
            }));

            return { tableRowProps: rows, hasReachedEnd: response.hasReachedEnd };
        } catch (error) {
            return { tableRowProps: [], message: 'Error fetching users' };
        }
    }, [authedRequest]);

    const dashboardDisplaySelectionProps = React.useMemo(
        () => [
            {
                name: 'Users',
                displayComponent: (
                    <Table
                        key={'users_table'}
                        collumnHeaders={['ID', 'Name', 'Email', 'Permission', 'Role']}
                        onReachEnd={onReachEnd}
                        onSearch={onSearch}
                        filterProps={{
                            name: 'Filter',
                            allButton: true,
                            selections: ['ID', 'Name', 'Email'],
                            defaultAllOn: true,
                        }}
                    />
                ),
            },
            {
                name: 'Restaurants',
                displayComponent: <div>Restaurants</div>,
            },
        ],
        [onReachEnd, onSearch]
    );

    return (
        <div className={`${tabStyles.content_custom}`}>
            <Dashboard
                key={'admin_dashboard'}
                selectionDropdownName={'View'}
                dashboardDisplaySelectionProps={dashboardDisplaySelectionProps}
            />
        </div>
    );
};

export default Accounts;
