import React, { useEffect, useState } from 'react';
import style from '@/styles/dashboardTab.module.css';
import CustomTable from '../_components/customTable';
import TableToolbar from '../_components/customTableToolbar';
import { ResponseType, useApiContext } from '@packages/apiCommunicator';
import { useRouter } from 'next/router';
import { useAuthContext } from '@packages/authProvider';

const Features: React.FC = () => {
    const handleEdit = (row: { [key: string]: string | number }) => {
        console.log("Edit action triggered for:", row);
    };

    const handleDelete = (row: { [key: string]: string | number }) => {
        console.log("Delete action triggered for:", row);
    };

    const handleSave = (row: { [key: string]: string | number }) => {
        console.log("Save action triggered for:", row);
    }

    const router = useRouter();
    const { api_auth_feature } = useApiContext();
    const { token } = useAuthContext();

    // State to store features by [{id, name, min, max}]
    interface Feature {
        id: number;
        name: string;
        min: number;
        max: number;
    }

    const [features, setFeatures] = useState<Feature[]>([]);

    const fetchData = async () => {
        const response = await api_auth_feature({ get: true });

        if (response.type === ResponseType.error) {
            return;
        }

        if (response.type === ResponseType.ok && response.authed === false) {
            router.push('/landing/login');
            return;
        }

        if (response.type === ResponseType.ok) {
            setFeatures(response.features);
            return;
        }
    };

    useEffect(() => {
        if (features.length === 0) {
            fetchData();
        }
    }, [token]);

    return (
        <div className={style.container}>
            <TableToolbar addButtonName='Create New Feature' onRefresh={() => { fetchData(); }} />
            <CustomTable
                columns={[
                    { name: 'Feature', key: 'name' },
                    { name: 'Maximum Value', key: 'max' },
                    { name: 'Minimum Value', key: 'min' },
                ]}
                data={features.map((feature) => {
                    return {
                        id: feature.id,
                        name: feature.name,
                        min: feature.min,
                        max: feature.max
                    };
                })}
                editAction={handleEdit}
                deleteAction={handleDelete}
                saveAction={handleSave}
                loading={features.length === 0}
            />
        </div>
    );
};

export default Features;
