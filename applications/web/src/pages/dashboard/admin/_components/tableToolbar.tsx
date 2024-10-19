import { Button } from '@nextui-org/react';
import React from 'react';
import AddIcon from './addIcon';

export interface TableToolbarProps {
    addButtonName: string
}

const TableToolbar: React.FC<TableToolbarProps> = ({addButtonName}) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
                <Button color="primary" endContent={<AddIcon/>}>
                    {addButtonName}
                </Button>
            </div>
        </div>
    );
};

export default TableToolbar;