import React from 'react';
import styles from '@/styles/dashboard_table.module.css';

interface DashboardTableProps {
    collumnHeaders: string[];
    collumns: DashboardTableRowProps[];

}

const DashboardTable: React.FC<DashboardTableProps> = ({ collumnHeaders, collumns }) => {
    return (
        <div className={styles.dashboard_table_content}>
            <table className={styles.dashboard_table}>
                
                <thead className={styles.dashboard_table_header}>
                    <tr>
                        {collumnHeaders.map((header, index) => {
                            return (
                                <th key={index}>{header}</th>
                            );
                        })}
                    </tr>
                </thead>

                <tbody className={styles.dashboard_table_body}>
                    {collumns.map((collumn, index) => {
                        return (
                            <tr key={index} className={styles.dashboard_table_row}>
                                {collumn.strings.map((string, index) => {
                                    return (
                                        <td key={index}>{string}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
                
            </table>
        </div>
    );
};

interface DashboardTableRowProps {
    strings: string[];
}

const DashboardTableRow: React.FC<DashboardTableRowProps> = (props) => {
    return (
        <div className={styles.dashboard_table_row}>
            
        </div>
    );
}   

export default DashboardTable;