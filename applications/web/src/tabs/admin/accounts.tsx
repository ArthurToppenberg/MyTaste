import React from 'react';
import {Button} from "@nextui-org/button";

const Accounts: React.FC = () => {

    return (
        <>
            <Button>
                Hello World
            </Button>

        </>
    );
};












// const Accounts: React.FC = () => {
//     const { authedRequest } = useAuthContext();

//     const onReachEnd_users = React.useCallback(async (index: number): Promise<DashboardTableData> => {
//         try {
//             const response: IUsersResponse = await getUsers(authedRequest, {
//                 simpleList: {
//                     index: index,
//                     limit: 30,
//                 },
//             });

//             if (response.users === undefined) {
//                 return { tableRowProps: [], message: response.message };
//             }

//             const users: IUsers = { users: response.users };

//             const rows: DashboardTableRowProps[] = users.users.map(user => ({
//                 rowData: [
//                     user.id.toString(),
//                     user.profile?.name || '',
//                     user.email,
//                     user.permission,
//                     user.type,
//                 ],
//             }));

//             return { tableRowProps: rows, hasReachedEnd: response.hasReachedEnd };
//         } catch (error) {
//             return { tableRowProps: [], message: 'Error fetching users' };
//         }
//     }, [authedRequest]);

//     const onSearch_users = React.useCallback(async (query: string, filters: string[]): Promise<DashboardTableData> => {
//         try {
//             const response: IUsersResponse = await getUsers(authedRequest, {
//                 search: {
//                     query: query,
//                     count: 30,
//                     field: filters,
//                 },
//             });

//             if (response.users === undefined) {
//                 return { tableRowProps: [], message: response.message };
//             }

//             const users: IUsers = { users: response.users };

//             const rows: DashboardTableRowProps[] = users.users.map(user => ({
//                 rowData: [
//                     user.id.toString(),
//                     user.profile?.name || '',
//                     user.email,
//                     user.permission,
//                     user.type,
//                 ],
//             }));

//             return { tableRowProps: rows, hasReachedEnd: response.hasReachedEnd };
//         } catch (error) {
//             return { tableRowProps: [], message: 'Error fetching users' };
//         }
//     }, [authedRequest]);

//     const dashboardDisplaySelectionProps = React.useMemo(
//         () => [
//             {
//                 name: 'Users',
//                 displayComponent: (
//                     <Table
//                         key={'users_table'}
//                         collumns={[
//                             { name: 'ID', editType: TableCollumnEditType.NUMBER },
//                             { name: 'Name'},
//                             { name: 'Email'},
//                             { name: 'Permission'},
//                             { name: 'Role'},
//                         ]}
//                         onReachEnd={onReachEnd_users}
//                         onSearch={onSearch_users}
//                         filterProps={{
//                             name: 'Filter',
//                             allButton: true,
//                             selections: ['ID', 'Name', 'Email'],
//                             defaultAllOn: true,
//                         }}
//                     />
//                 ),
//             },
//             {
//                 name: 'Restaurants',
//                 displayComponent: (
//                     <p>Restaurants</p>
//                 ),
//             },
//         ],
//         [onReachEnd_users, onSearch_users]
//     );

//     return (
//         <div className={`${tabStyles.content_custom}`}>
//             <Dashboard
//                 key={'admin_dashboard'}
//                 selectionDropdownName={'Select'}
//                 dashboardDisplaySelectionProps={dashboardDisplaySelectionProps}
//             />
//         </div>
//     );
// };

export default Accounts;
