import React, { useEffect, useImperativeHandle, useState, forwardRef, useRef, useCallback } from 'react';
import styles from '@/styles/dashboard_table.module.css';
import { IDashboard } from './dashboard';
import InfoBox from './info_box';
import {MultiselectProps} from './dashboard_toolbar_multiselect';

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
    staticCollumns?: DashboardTableRowProps[];
    onLoad?: () => Promise<DashboardTableData>;
    onReachEnd?: (index: number) => Promise<DashboardTableData>;
    LoadingTableProps?: LoadingTableProps;
    onSearch?: (search: string, filters: string[]) => Promise<DashboardTableData>;
    filterProps?: MultiselectProps;
}

export interface DashboardTableData {
    tableRowProps: DashboardTableRowProps[];
    message?: string;
    hasReachedEnd?: boolean;
}

export interface DashboardTableRowProps {
    rowData: string[];
}

const DashboardTable: React.FC<DashboardTableProps> = forwardRef<IDashboard, DashboardTableProps>(
    ({ collumnHeaders, staticCollumns, onLoad, onReachEnd, LoadingTableProps, onSearch }, ref) => {
        const [tableData, setTableData] = useState<DashboardTableData>({ tableRowProps: staticCollumns ?? [] });
        const bottomRef = useRef<HTMLDivElement>(null); // Reference for detecting the end of the table
        const [isLoading, setIsLoading] = useState(false); // State to track loading status
        const [scrollLoading, setScrollLoading] = useState(true);
        const [pauseRequests, setPauseRequests] = useState(false); // To track when to pause loading more data

        const Refresh = useCallback(() => {
            if ((onLoad && onReachEnd) || (!onLoad && !onReachEnd)) {
                return console.error('Error: onLoad and onReachEnd cannot be used together');
            }
            setTableData({ tableRowProps: [] });
            setIsLoading(true); // Set loading to true before data fetch

            const loadData = async () => {
                try {
                    let data: DashboardTableData;
                    if (onLoad) {
                        data = await onLoad();
                    } else if (onReachEnd) {
                        data = await onReachEnd(0);
                    } else {
                        return; // No loading function provided
                    }
                    setTableData(data);
                } catch (error) {
                    console.error('Error loading data:', error);
                } finally {
                    setIsLoading(false); // Loading complete
                }
            };

            loadData();
        }, [onLoad, onReachEnd]);

        const Search = useCallback((query: string, filters: string[]) => {
            if (!onSearch) {
                return console.error('Error: onSearch is not defined');
            }
            setTableData({ tableRowProps: [] });
            setIsLoading(true); // Set loading to true before data fetch

            const searchData = async () => {
                try {
                    const data = await onSearch(query, filters);
                    setTableData(data);
                } catch (error) {
                    console.error('Error searching data:', error);
                } finally {
                    setIsLoading(false); // Loading complete
                }
            };

            searchData();
        }, [onSearch]);

        useEffect(() => {
            Refresh();
        }, [Refresh]);

        useImperativeHandle(ref, () => ({
            refresh: () => {
                setScrollLoading(true);
                setPauseRequests(false);
                Refresh();
            },
            search: (query: string, filters: string[]) => {
                setScrollLoading(false);
                setPauseRequests(false);
                Search(query, filters);
            }
        }), [Refresh, Search]);

        const OnReachEndDetected = useCallback(() => {
            if (!onReachEnd || isLoading || !scrollLoading || pauseRequests) {
                return; // Exit if no function, already loading, not scrolling, or pause active
            }

            setIsLoading(true); // Set loading to true before data fetch
            const loadMoreData = async () => {
                try {
                    const data = await onReachEnd(tableData.tableRowProps.length);
                    setTableData((prevData) => ({
                        tableRowProps: [...prevData.tableRowProps, ...data.tableRowProps],
                        message: data.message
                    }));
                    setIsLoading(false); // Loading complete
                    if(!data.hasReachedEnd) {
                        return;
                    }
                    setPauseRequests(true); // Pause new requests for 10 seconds\
                    setTimeout(() => setPauseRequests(false), 10000); // After 10 seconds, resume checking
                } catch (error) {
                    console.error('Error loading more data:', error);
                } 
            };

            loadMoreData();
        }, [onReachEnd, tableData, isLoading, scrollLoading, pauseRequests]);

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

            const currentBottomRef = bottomRef.current;
            if (currentBottomRef) {
                observer.observe(currentBottomRef);
            }

            return () => {
                if (currentBottomRef) {
                    observer.unobserve(currentBottomRef);
                }
            };
        }, [OnReachEndDetected, isLoading]);

        return (
            <div 
                className={styles.dashboard_table_content} 
            >
                {tableData.message ? (
                    <MessageTable message={tableData.message} />
                ) : tableData.tableRowProps.length === 0 ? (
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
                                {tableData.tableRowProps.map((row, rowIndex) => (
                                    <tr key={rowIndex} className={styles.dashboard_table_row}>
                                        {row.rowData.map((cell, cellIndex) => (
                                            <td key={cellIndex}>{cell}</td>
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

DashboardTable.displayName = 'DashboardTable';

enum EditType {
    string,
    number,
    enum,
}

interface TableRowDataProps{
    value: string;
    editType?: EditType;
}

interface TableRowProps{
    id: number;
    data: TableRowDataProps[];
}

const TableRow: React.FC<TableRowProps> = ({ id, data }) => {
    return (
        <tr key={id} className={styles.dashboard_table_row}>
            {data.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell.value}</td>
            ))}
        </tr>
    );
}

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

/**
 * TableMessage component to display a message in the table
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.message - The message to display.
 */
interface MessageTableProps {
    message: string;
}

const MessageTable: React.FC<MessageTableProps> = ({ message }) => {
    return (
        <div className={styles.dashboard_table_message}>
            <InfoBox text={message} loading={false} inverted={true} />
        </div>
    );
}

export default DashboardTable;
