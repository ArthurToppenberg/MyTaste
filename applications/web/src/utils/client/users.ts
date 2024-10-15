// import { IAuthContext } from '@packages/authProvider/src/authContext';
// import { IUsersResponse, usersProps } from '../../pages/api/protected/admin/users';

// export const getUsers = async (authedRequest: IAuthContext['authedRequest'], props: usersProps): Promise<IUsersResponse> => {
//     try {
//         const response = await authedRequest('/protected/admin/users', 'POST', props).catch((message) => {
//             console.error('ERROR - Failed to fetch users: ', message);
//             return Promise.reject({ message });
//         });

//         if (response.message) {
//             return Promise.reject(`Failed to fetch users: ${response.message}`);
//         }

//         const data: IUsersResponse = response;
//         return data;
//     } catch (error) {
//         if (error instanceof Error) {
//             return Promise.reject(`Failed to fetch users: ${error.message}`);
//         } else {
//             return Promise.reject('Failed to fetch users: Unknown error');
//         }
//     }
// };