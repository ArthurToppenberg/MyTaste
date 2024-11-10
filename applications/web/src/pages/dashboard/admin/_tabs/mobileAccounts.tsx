import React, { use, useEffect, useState } from 'react';
import style from '@/styles/dashboardTab.module.css';
import CustomTable from '../_components/customTable';
import TableToolbar from '../_components/customTableToolbar';
import { ResponseType, useApiContext } from '@packages/apiCommunicator';
import { useRouter } from 'next/router';
import { useAuthContext } from '@packages/authProvider';
import Header from '../../_components/header';
import { AccountsResponse } from '@packages/apiCommunicator/src/interactions/accounts';

const MobileAccounts: React.FC = () => {
    const [data, setData] = useState<AccountsResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const { api_auth_accounts } = useApiContext();
    const {token } = useAuthContext();

    const getAccounts = async () => {
        const response = await api_auth_accounts({
            get: {
                index: 0,
                count: 10
            }
        });
        setData(response);
        console.log(response);
        setLoading(false);
    }

    useEffect(() => {
        if(data === undefined){
            getAccounts();
        }
    }, [token]);


    return (
        <>
            <Header title='Mobile Accounts' />
            <div className={style.container}>
                <TableToolbar
                    addButtonName="Create New Mobile Account"
                    onRefresh={() => { }}
                    onAddButton={() => {}}
                />
            </div>
        </>
    );
};

export default MobileAccounts;