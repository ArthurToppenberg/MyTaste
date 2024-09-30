import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardToolbarDropdown, { DashboardDropdownProps } from './dashboard_toolbar_dropdown';

export interface MultiselectProps {
    name: string;
    allButton?: boolean;
    selections: string[];
    onFilterChange?: (selectedItems: string[]) => void;
}

// ❌ not selected
// ✅ selected

const Multiselect: React.FC<MultiselectProps> = ({ name, selections, allButton, onFilterChange }) => {
    const selectableItems = (allButton ? ['All', ...selections] : selections);
    const [selectedItemsIndexes, setSelectedItemsIndexes] = React.useState<number[]>([]);

    // Trigger onFilterChange whenever selectedItemsIndexes changes
    useEffect(() => {
        const selectedFilters = selectedItemsIndexes
            .filter(index => index !== 0) // Exclude "All" option
            .map(index => selections[index - 1]); // Map index to actual selection
        onFilterChange?.(selectedFilters);
    }, [selectedItemsIndexes, selections, onFilterChange]);

    return (
        <>
            <DashboardToolbarDropdown
                hideSelection={true}
                name={name}
                itemsProps={selectableItems.map((selection, index) => {
                    return {
                        name: `${selectedItemsIndexes.includes(index) || (index === 0 && selectedItemsIndexes.length === selections.length) ? '✅' : '❌'} ${selection}`,
                        onClick: () => {
                            if (index === 0) {
                                // Handle "All" selection/deselection
                                if (selectedItemsIndexes.length === selections.length) {
                                    setSelectedItemsIndexes([]); // Deselect all
                                } else {
                                    setSelectedItemsIndexes(selections.map((_, i) => i + 1)); // Select all
                                }
                            } else {
                                // Handle individual selection/deselection
                                setSelectedItemsIndexes(prevState => {
                                    if (prevState.includes(index)) {
                                        return prevState.filter(itemIndex => itemIndex !== index);
                                    } else {
                                        return [...prevState, index];
                                    }
                                });
                            }
                        },
                        darker: (index === 0 && allButton)
                    };
                })}
                defaultItem={0}
            />
        </>
    );
};

export default Multiselect;
