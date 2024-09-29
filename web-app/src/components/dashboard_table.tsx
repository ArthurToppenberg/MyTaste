import React, { useEffect, useImperativeHandle, useState, forwardRef, useRef, useCallback } from 'react';
import styles from '@/styles/dashboard_table.module.css';
import { IDashboardRefreshable } from './dashboard';
import InfoBox from './info_box';

/**
 * DashboardTable component to display a table with optional loading state and infinite scroll (As long as there is data)
 * 
 * @param {Object} props - The properties object.
 * @param {string[]} props.collumnHeaders - The headers for the table collumns.
 * @param {DashboardTableRowProps[]} [props.collumns] - The rows of the table.
 * @param {() => Promise<DashboardTableRowProps[]>} [props.onLoad] - The function to call when the table is loaded.
 * @param {() => Promise<DashboardTableRowProps[]>} [props.onReachEnd] - The function to call when the table reaches the end.
 * @param {LoadingTableProps} [props.LoadingTableProps] - The properties for the loading table.
 */
export interface DashboardTableProps {
    collumnHeaders: string[];
    collumns?: DashboardTableRowProps[];
    onLoad?: () => Promise<DashboardTableRowProps[]>;
    onReachEnd?: (index: number) => Promise<DashboardTableRowProps[]>;
    LoadingTableProps?: LoadingTableProps;
}

export interface DashboardTableRowProps {
    rowData: string[];
}

const DashboardTable: React.FC<DashboardTableProps> = forwardRef<IDashboardRefreshable, DashboardTableProps>(
    ({ collumnHeaders, collumns, onLoad, onReachEnd, LoadingTableProps }: DashboardTableProps, ref) => {
        const [tableData, setTableData] = useState<DashboardTableRowProps[]>(collumns || []);
        const bottomRef = useRef<HTMLDivElement>(null); // Reference for detecting the end of the table
        const [isLoading, setIsLoading] = useState(true); // State to track loading status
        const [hasReachedEnd, setHasReachedEnd] = useState(false);

        useEffect(() => {
            InitGetTableData();
        }, []);

        useImperativeHandle(ref, () => ({
            refresh: () => {
                InitGetTableData();
            },
        }));

        const InitGetTableData = useCallback(() => {
            if ((onLoad && onReachEnd) || (!onLoad && !onReachEnd)) {
                return console.error('Error: onLoad and onReachEnd cannot be used together');
            }
            setTableData([]);
            setIsLoading(true); // Set loading to true before data fetch
            if (onLoad) {
                // Handle onLoad logic here
                onLoad().then((data) => {
                    setTableData(data);
                    setIsLoading(false); // Loading complete
                });
            } else if (onReachEnd) {
                onReachEnd(0).then((data) => {
                    setTableData([...data]);
                    setIsLoading(false); // Loading complete
                });
            }
        }, [onLoad, onReachEnd]);

        const OnReachEndDetected = useCallback(() => {
            if (!onReachEnd) {
                return;
            }
            setIsLoading(true); // Set loading to true before data fetch
            onReachEnd(tableData.length).then((data) => {
                if(data.length === 0){
                    setHasReachedEnd(true);
                    return;
                }
                const previousTableData: DashboardTableRowProps[] = tableData;
                const newTableData: DashboardTableRowProps[] = data;
                const combinedTableData: DashboardTableRowProps[] = [...previousTableData, ...newTableData];
                setTableData(combinedTableData);
                setIsLoading(false); // Loading complete
            });
        }, [onReachEnd, tableData, hasReachedEnd]);

        // IntersectionObserver to detect scrolling to the bottom
        useEffect(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && !isLoading) {
                        OnReachEndDetected();
                    }
                },
                { threshold: 0.5 } // Trigger when 50% of the target is visible
            );

            if (bottomRef.current) {
                observer.observe(bottomRef.current);
            }

            return () => {
                if (bottomRef.current) {
                    observer.unobserve(bottomRef.current);
                }
            };
        }, [OnReachEndDetected, isLoading]); // Added isLoading to dependencies

        return (
            <div className={styles.dashboard_table_content}>
                {tableData.length === 0 ? (
                    LoadingTableProps ? (
                        <LoadingTable {...LoadingTableProps} />
                    ) : (
                        <LoadingTable rows={20} collumns={5} expectedTableHeaders={['ID', 'Email', 'Permission', 'Role', 'Profile']} />
                    )
                ) : (
                    <>
                        <table className={styles.dashboard_table}>
                            <thead className={styles.dashboard_table_header}>
                                <tr>
                                    {collumnHeaders.map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className={styles.dashboard_table_body}>
                                {tableData.map((tableData, index) => (
                                    <tr key={index} className={styles.dashboard_table_row}>
                                        {tableData.rowData.map((collumn, index) => (
                                            <td key={index}>{collumn}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Invisible div to detect the bottom of the table */}
                        <div ref={bottomRef} style={{ height: '1px' }} />
                    </>
                )}
            </div>
        );
    }
);

const DashboardTableRow: React.FC<DashboardTableRowProps> = (props) => {
    return (
        <div className={styles.dashboard_table_row}>
            {/* Render row content here if needed */}
        </div>
    );
};

/**
 * LoadingTable component to display a table with loading state
 * 
 * @param {Object} props - The properties object.
 * @param {number} props.rows - The number of rows in the table.
 * @param {number} props.collumns - The number of collumns in the table.
 * @param {string[]} [props.expectedTableHeaders] - The headers for the table collumns.
 */
interface LoadingTableProps {
    rows: number;
    collumns: number;
    expectedTableHeaders?: string[];
}

const LoadingTable: React.FC<LoadingTableProps> = ({ rows, collumns, expectedTableHeaders }) => {
    return (
        <div className={styles.dashboard_table_content}>
            <table className={styles.dashboard_table}>
                <thead className={styles.dashboard_table_header}>
                    <tr>
                        {expectedTableHeaders ? (
                            expectedTableHeaders.map((header, index) => (
                                <th key={index}>
                                    {header}
                                </th>
                            ))
                        ) : (
                            [...Array(collumns)].map((_, index) => (
                                <th key={index}>
                                    <InfoBox text="Loading..." key={index} loading={true} inverted={true} />
                                </th>
                            ))
                        )}
                    </tr>
                </thead>
                <tbody className={styles.dashboard_table_body}>
                    {[...Array(rows)].map((_, rowIndex) => (
                        <tr key={rowIndex} className={styles.dashboard_table_row}>
                            {[...Array(collumns)].map((_, colIndex) => (
                                <td key={colIndex}>
                                    <InfoBox text="Loading..." key={colIndex} loading={true} inverted={true} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardTable;
