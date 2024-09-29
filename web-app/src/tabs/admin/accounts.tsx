import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import tabStyles from '@/styles/tab.module.css';
import Dashboard from '@/components/dashboard';
import Table, { DashboardTableRowProps } from '@/components/dashboard_table';
import { getUsers } from '../../utils/client/users';
import { IUsers } from '@/pages/api/protected/admin/users';

const Home: React.FC = () => {
    return (
        <>
            <div className={`${tabStyles.content_custom}`}>
                <Dashboard
                    selectionDropdownName={'View'}
                    dashboardDisplaySelectionProps={[
                        {
                            name: 'Users',
                            displayComponent:
                                <Table
                                    collumnHeaders={[
                                        'ID',
                                        'Email',
                                        'Permission',
                                        'Role',
                                        'Profile'
                                    ]}
                                    onReachEnd={async (index: number): Promise<DashboardTableRowProps[]> => {
                                        try {
                                            const users: IUsers = await getUsers(
                                                {
                                                    simpleList: {
                                                        index: index,
                                                        limit: 10
                                                    }
                                                }
                                            );
                                            let rows: DashboardTableRowProps[] = [];
                                            users.users.forEach(user => {
                                                rows.push({
                                                    rowData: Object.values(user).map(value => value.toString())
                                                });
                                            });
                                            return rows;
                                        } catch (error) {
                                            console.error('Error fetching users:', error);
                                            return [];
                                        }
                                    }}
                                />
                        },
                        {
                            name: 'Restaurants',
                            displayComponent: <div>Restaurants</div>
                        }
                    ]}
                />
            </div>
        </>
    );
};

export default Home;