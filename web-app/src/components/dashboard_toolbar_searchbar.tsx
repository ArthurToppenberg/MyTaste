import React from 'react';
import styles from '../styles/dashboard_toolbar_searchbar.module.css';

export interface DashboardToolbarSearchbarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
}

const DashboardToolbarSearchbar: React.FC<DashboardToolbarSearchbarProps> = ({ placeholder = "Search...", onSearch }) => {
    const [query, setQuery] = React.useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className={styles.container}>
            <input 
                type="text" 
                value={query} 
                onChange={handleInputChange} 
                placeholder={placeholder} 
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default DashboardToolbarSearchbar;