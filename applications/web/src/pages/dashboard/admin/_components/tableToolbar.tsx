import { Button } from '@nextui-org/react';
import React from 'react';
import AddIcon from './addIcon';
import RefreshIcon from './refreshIcon';

export interface TableToolbarProps {
    addButtonName: string
    onRefresh?: () => void
}

const TableToolbar: React.FC<TableToolbarProps> = ({ addButtonName, onRefresh}) => {
    return (
        <div className="flex flex-row gap-4">
            <div style={{ marginRight: 'auto' }}>
                <Button color="primary" endContent={<AddIcon />}>
                    {addButtonName}
                </Button>
            </div>
            {onRefresh && (
                <div style={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
                    <Button color="primary" endContent={<RefreshIcon />} onClick={onRefresh}>
                        Refresh
                    </Button>
                </div>
            )}
        </div>
    );
};

export default TableToolbar;