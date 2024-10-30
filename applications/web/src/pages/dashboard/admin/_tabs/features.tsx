import React, { useEffect, useState } from 'react';
import style from '@/styles/dashboardTab.module.css';
import CustomTable from '../_components/customTable';
import TableToolbar from '../_components/customTableToolbar';
import { ResponseType, useApiContext } from '@packages/apiCommunicator';
import { useRouter } from 'next/router';
import { useAuthContext } from '@packages/authProvider';
import Header from '../../_components/header';

const Features: React.FC = () => {
    const router = useRouter();
    const { api_auth_feature } = useApiContext();
    const { token } = useAuthContext();

    const handleDelete = (row: { [key: string]: string | number }) => {
        console.log("Delete action triggered for:", row);
    };

    const handleSave = async (row: { [key: string]: string | number }): Promise<string> => {
        const response = await api_auth_feature({ set: { id: row.id as number, name: row.name.toString(), min: row.min.toString(), max: row.max.toString() } });

        if (response.type === ResponseType.error) {
            return Promise.reject(response.errorMessage || 'An error occured but no error message was provided'); 
        }

        if (response.type === ResponseType.ok && response.authed === false) {
            router.push('/landing/login');
            return Promise.reject(response.errorMessage || 'An error occured but no error message was provided'); 
        }
        
        if (response.type === ResponseType.ok && response.feature) {
           //update the response feature in the features state, but only update the single feature that was changed
              setFeatures((prev) => {
                return prev.map((feature) => {
                     if (feature.id === response.feature?.id) {
                          return {
                            id: response.feature.id,
                            name: response.feature.name,
                            min: response.feature.min,
                            max: response.feature.max
                          };
                     }
                     return feature;
                });
              });
        }

        return response.message || 'No message was provided';
    }

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
        //Fetch the data only on the inital load
        if (features.length === 0) {
            fetchData();
        }
    }, [token]);

    return (
        <>
            <Header title='Features' />
            <div className={style.container}>
                <TableToolbar addButtonName='Create New Feature' onRefresh={() => { setFeatures([]); fetchData(); }} />
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
                    deleteAction={handleDelete}
                    saveAction={handleSave}
                    loading={features.length === 0}
                    
                />
            </div>
        </>
    );
};

export default Features;
