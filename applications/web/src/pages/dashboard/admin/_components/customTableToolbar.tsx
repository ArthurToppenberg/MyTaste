import { Button, Card, CardBody } from '@nextui-org/react';
import React from 'react';
import AddIcon from './addIcon';
import RefreshIcon from './refreshIcon';

export interface TableToolbarProps {
    addButtonName: string
    onAddButton?: () => void
    onRefresh?: () => void
}

const TableToolbar: React.FC<TableToolbarProps> = ({ addButtonName, onRefresh, onAddButton }) => {
    return (
        <Card>
            <CardBody>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button color="secondary" endContent={<AddIcon />} onClick={onAddButton}>
                    {addButtonName}
                </Button>
                {onRefresh && (
                    <Button color="secondary" endContent={<RefreshIcon />} onClick={onRefresh}>
                        Refresh
                    </Button>
                )}
            </div>
            </CardBody>
        </Card>
    );
};

export default TableToolbar;
