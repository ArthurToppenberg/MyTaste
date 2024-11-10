import React, { useEffect, useState } from 'react';
import style from '@/styles/dashboardTab.module.css';
import CustomTable from '../_components/customTable';
import TableToolbar from '../_components/customTableToolbar';
import { ResponseType, useApiContext } from '@packages/apiCommunicator';
import { useRouter } from 'next/router';
import { useAuthContext } from '@packages/authProvider';
import Header from '../../_components/header';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';

const Features: React.FC = () => {
    const router = useRouter();
    const { api_auth_feature } = useApiContext();
    const { token } = useAuthContext();

    // State to store features by [{id, name, min, max}]
    interface Feature {
        id?: number;
        name: string;
        min: number;
        max: number;
    }

    const [features, setFeatures] = useState<Feature[]>([]);

    const fetchData = React.useCallback(async () => {
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
    }, [api_auth_feature, router]);

    useEffect(() => {
        // Fetch the data only on the initial load
        if (features.length === 0) {
            fetchData();
        }
    }, [token, features.length, fetchData]);

    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange } = useDisclosure();
    const { isOpen: isCreateOpen, onOpen: onCreateOpen, onOpenChange: onCreateOpenChange } = useDisclosure();

    const [selectedRow, setSelectedRow] = useState<{ [key: string]: string | number | undefined }>({});

    const handleDelete = (row: { [key: string]: string | number | undefined }) => {
        setSelectedRow(row);
        onDeleteOpen();
    };

    const deleteFeature = async (): Promise<string> => {
        const response = await api_auth_feature({ delete: selectedRow.id as number });

        if (response.type === ResponseType.error) {
            return Promise.reject(response.errorMessage || 'An error occurred but no error message was provided');
        }

        if (response.type === ResponseType.ok && response.authed === false) {
            router.push('/landing/login');
            return Promise.reject(response.errorMessage || 'An error occurred but no error message was provided');
        }

        if (response.type === ResponseType.ok && response.feature) {
            // Remove feature from the features state
            setFeatures((prev) => {
                return prev.filter((feature) => feature.id !== response.feature?.id);
            });
        }

        return response.message || 'No message was provided';
    };

    const handleSave = async (row: { [key: string]: string | number | undefined }): Promise<string> => {
        const response = await api_auth_feature({
            set: {
                id: row.id as number,
                name: row.name?.toString() || '',
                min: row.min?.toString() || '',
                max: row.max?.toString() || '',
            },
        });

        if (response.type === ResponseType.error) {
            return Promise.reject(response.errorMessage || 'An error occurred but no error message was provided');
        }

        if (response.type === ResponseType.ok && response.authed === false) {
            router.push('/landing/login');
            return Promise.reject(response.errorMessage || 'An error occurred but no error message was provided');
        }

        if (response.type === ResponseType.ok && response.feature) {
            // Update the response feature in the features state
            setFeatures((prev) => {
                return prev.map((feature) => {
                    if (feature.id === response.feature?.id) {
                        return {
                            id: response.feature.id,
                            name: response.feature.name,
                            min: response.feature.min,
                            max: response.feature.max,
                        };
                    }
                    return feature;
                });
            });
        }

        return response.message || 'No message was provided';
    };

    // State variables for create modal
    const [newFeatureName, setNewFeatureName] = useState('');
    const [newFeatureMin, setNewFeatureMin] = useState('');
    const [newFeatureMax, setNewFeatureMax] = useState('');
    const [newFeatureMessage, setNewFeatureMessage] = useState('');
    const [newFeatureError, setNewFeatureError] = useState(false);
    const [newFeatureCreateButtonLoading, setNewFeatureCreateButtonLoading] = useState(false);

    const handleAdd = () => {
        onCreateOpen();
    };

    const createFeature = async (): Promise<string> => {
        const response = await api_auth_feature({
            create: {
                name: newFeatureName,
                min: newFeatureMin,
                max: newFeatureMax,
            },
        });

        if (response.type === ResponseType.error) {
            return Promise.reject(response.errorMessage || 'An error occurred but no error message was provided');
        }

        if (response.type === ResponseType.ok && response.authed === false) {
            router.push('/landing/login');
            return Promise.reject(response.errorMessage || 'An error occurred but no error message was provided');
        }

        if (response.type === ResponseType.ok && response.feature) {
            // Add the new feature to the features state
            setFeatures((prev) => {
                return [
                    ...prev,
                    {
                        id: response.feature.id,
                        name: response.feature.name,
                        min: response.feature.min,
                        max: response.feature.max,
                    },
                ];
            });
        }

        return response.message || 'No message was provided';
    };

    return (
        <>
            <Header title="Features" />
            <div className={style.container}>
                <TableToolbar
                    addButtonName="Create New Feature"
                    onRefresh={() => {
                        setFeatures([]);
                        fetchData();
                    }}
                    onAddButton={handleAdd}
                />
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
                            max: feature.max,
                        };
                    })}
                    deleteAction={handleDelete}
                    saveAction={handleSave}
                    loading={features.length === 0}
                />
            </div>
            {/* Delete Modal */}
            <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Delete Feature</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete this feature?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={async () => {
                                        await deleteFeature();
                                        onClose();
                                    }}
                                >
                                    Yes
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {/* Create Modal */}
            <Modal isOpen={isCreateOpen} onOpenChange={onCreateOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Create New Feature</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Name"
                                    placeholder="Ex. Price"
                                    value={newFeatureName}
                                    onChange={(e) => setNewFeatureName(e.target.value)}
                                />
                                <Input
                                    label="Minimum Value"
                                    type="number"
                                    placeholder="Ex. 20 ddk"
                                    value={newFeatureMin}
                                    onChange={(e) => setNewFeatureMin(e.target.value)}
                                />
                                <Input
                                    label="Maximum Value"
                                    type="number"
                                    placeholder="Ex. 250 ddk"
                                    value={newFeatureMax}
                                    onChange={(e) => setNewFeatureMax(e.target.value)}
                                />
                                {newFeatureMessage && !newFeatureError && (
                                    <p style={{ color: 'green' }}>{newFeatureMessage}</p>
                                )}
                                {newFeatureError && (
                                    <p style={{ color: 'red' }}>An error occurred while creating the feature.</p>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color="primary"
                                    isLoading={newFeatureCreateButtonLoading}
                                    onPress={async () => {
                                        try {
                                            setNewFeatureCreateButtonLoading(true);
                                            await createFeature().then((message) => {
                                                setNewFeatureError(false);
                                                setNewFeatureName('');
                                                setNewFeatureMin('');  
                                                setNewFeatureMax('');
                                                onClose();
                                            }).catch((error) => {
                                                setNewFeatureMessage(error);
                                                setNewFeatureError(true);
                                            }).finally(() => {
                                                setNewFeatureCreateButtonLoading(false);
                                            });
                                        } catch (error) {
                                            // Handle error (e.g., display error message)
                                            console.error(error);
                                        }
                                    }}
                                >
                                    Create
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default Features;
