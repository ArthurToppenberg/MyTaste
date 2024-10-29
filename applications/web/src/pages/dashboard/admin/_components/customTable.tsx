import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Image,
  Chip,
  Tooltip,
  Skeleton,
} from "@nextui-org/react";
import NextImage from "next/image"; 

interface TableProps {
  columns: { name: string; key: string }[];
  data: { [key: string]: string | number }[];
  editAction?: (row: { [key: string]: string | number }) => void;
  deleteAction?: (row: { [key: string]: string | number }) => void;
  saveAction?: (row: { [key: string]: string | number }) => void;
  loading?: boolean; // Added loading prop
}

/**
 * CustomTable component to display data in a tabular format with optional action buttons.
 *
 * @param columns - Array of column objects with 'name' and 'key'. The 'key' should match the key in data to be displayed in the table.
 * @param data - Array of data objects where each key corresponds to a column key. The 'id' key in data will be used as the table row key if provided.
 * @param editAction - Optional function to handle edit actions for a row.
 * @param deleteAction - Optional function to handle delete actions for a row.
 * @param saveAction - Optional function to handle save actions for a row.
 * @param loading - Boolean flag to display a loading skeleton when true.
 *
 * @returns A table component displaying the provided data with optional action buttons.
 */
const CustomTable: React.FC<TableProps> = ({
  columns,
  data,
  editAction,
  deleteAction,
  saveAction,
  loading = false, // Default loading to false
}) => {
  // Add the actions column if any action prop is provided
  const modifiedColumns = React.useMemo(() => {
    if (editAction || deleteAction || saveAction) {
      return [...columns, { name: "Actions", key: "actions" }];
    }
    return columns;
  }, [columns, editAction, deleteAction, saveAction]);

  return (
    <div
      style={{
        maxHeight: "calc(100vh - 200px)",
        maxWidth: "100%",
        overflow: "auto", // Changed from 'scroll' to 'auto'
        borderRadius: "1rem",
      }}
    >
      <Table
        isHeaderSticky
        classNames={{
          base: "max-h-[520px] overflow-auto", // Changed from 'overflow-scroll' to 'overflow-auto'
          table: "min-h-[400px]",
        }}
      >
        <TableHeader>
          {modifiedColumns.map((col, index) => (
            <TableColumn key={`col-${index}`} style={{ minWidth: "150px" }}>
              {col.name}
            </TableColumn>
          ))}
        </TableHeader>
        {loading ? (
          <TableBody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <TableRow key={`skeleton-row-${rowIndex}`}>
                {modifiedColumns.map((col, colIndex) => (
                  <TableCell key={`skeleton-cell-${rowIndex}-${colIndex}`}>
                    <Skeleton style={{ width: "100%", height: "1.5rem", borderRadius: '1rem' }} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={row.id !== undefined ? row.id : `row-${rowIndex}`} // Use 'id' as key if available
              >
                {modifiedColumns.map((col, colIndex) => (
                  <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                    {col.key === "actions" ? (
                      <div style={{ display: "flex", gap: "8px", cursor: 'pointer' }}>
                        {editAction && (
                          <Tooltip content="Edit" placement="top">
                            <Chip onClick={() => editAction(row)}>
                              <Image
                                as={NextImage}
                                src="/icons/settings.png"
                                width={15}
                                height={15}
                                alt="settings icon"
                                style={{ borderRadius: "0" }}
                              />
                            </Chip>
                          </Tooltip>
                        )}
                        {saveAction && (
                          <Tooltip content="Save" placement="top">
                            <Chip
                              color="success"
                              onClick={() => saveAction(row)}
                            >
                              <Image
                                as={NextImage}
                                src="/icons/save.png"
                                width={15}
                                height={15}
                                alt="save icon"
                                style={{ borderRadius: "0" }}
                              />
                            </Chip>
                          </Tooltip>
                        )}
                        {deleteAction && (
                          <Tooltip content="Delete" placement="top">
                            <Chip
                              color="danger"
                              onClick={() => deleteAction(row)}
                            >
                              <Image
                                as={NextImage}
                                src="/icons/delete.png"
                                width={15}
                                height={15}
                                alt="delete icon"
                                style={{ borderRadius: "0" }}
                              />
                            </Chip>
                          </Tooltip>
                        )}
                      </div>
                    ) : (
                      row[col.key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default CustomTable;
