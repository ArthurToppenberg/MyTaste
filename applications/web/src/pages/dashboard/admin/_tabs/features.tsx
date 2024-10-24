import React from 'react';
import style from '@/styles/dashboardTab.module.css';
import CustomTable from '../_components/table';
import TableToolbar from '../_components/tableToolbar';

const Features: React.FC = () => {
    // Define the edit and delete action handlers
    const handleEdit = (row: { [key: string]: string | number }) => {
        console.log("Edit action triggered for:", row);
    };

    const handleDelete = (row: { [key: string]: string | number }) => {
        console.log("Delete action triggered for:", row);
    };

    const handleSave = (row: { [key: string]: string | number }) => {
        console.log("Save action triggered for:", row);
    }

    return (
        <div className={style.container}>
            <TableToolbar addButtonName='Create New Feature' onRefresh={() => {}}/>
            <CustomTable
                columns={[
                    { name: 'Feature', key: 'name' },
                    { name: 'Minimum Value', key: 'min' },
                    { name: 'Maximum Value', key: 'max' },
                ]}
                data={[
                    { name: 'Feature 1', min: 0, max: 10 },
                    { name: 'Feature 2', min: 0, max: 10 },
                    { name: 'Feature 3', min: 0, max: 10 },
                ]}
                editAction={handleEdit}
                deleteAction={handleDelete}
                saveAction={handleSave}
            />
        </div>
    );
};

export default Features;
