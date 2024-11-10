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
  Spinner,
} from "@nextui-org/react";
import NextImage from "next/image";

interface RowData {
  id?: number | string;
  [key: string]: number | string | undefined;
}

interface TableProps {
  columns: { name: string; key: string }[];
  data: RowData[];
  deleteAction?: (row: RowData) => void;
  saveAction?: (row: RowData) => Promise<string>;
  loading?: boolean;
}

/**
 * CustomTable component to display data in a tabular format with optional action buttons.
 *
 * @param columns - Array of column objects with 'name' and 'key'. The 'key' should match the key in data to be displayed in the table.
 * @param data - Array of data objects where each key corresponds to a column key. The 'id' key in data will be used as the table row key if provided.
 * @param deleteAction - Optional function to handle delete actions for a row.
 * @param saveAction - Optional function to handle save actions for a row.
 * @param loading - Boolean flag to display a loading skeleton when true.
 *
 * @returns A table component displaying the provided data with optional action buttons.
 */
const CustomTable: React.FC<TableProps> = ({
  columns,
  data,
  deleteAction,
  saveAction,
  loading = false,
}) => {
  const [tableData, setTableData] = React.useState<RowData[]>(data);
  const [editingRowId, setEditingRowId] = React.useState<number | string | null>(
    null
  );
  const [editedRowData, setEditedRowData] = React.useState<RowData>({});
  const [prevTableData, setPrevTableData] = React.useState<RowData[]>([]);
  const [messages, setMessages] = React.useState<
    Record<string, { message: string; type: "success" | "error" }>
  >({});
  const [isSavingRowId, setIsSavingRowId] = React.useState<
    number | string | null
  >(null);

  React.useEffect(() => {
    setTableData(data);
    setPrevTableData(data);
  }, [data]);

  // Add the actions column if any action prop is provided
  const modifiedColumns = React.useMemo(() => {
    let cols = [...columns];
    if (deleteAction || saveAction) {
      cols = [...cols, { name: "Actions", key: "actions" }];
    }
    return cols;
  }, [columns, deleteAction, saveAction]);

  const onEdit = (row: RowData, rowIndex: number) => {
    const rowKey = row.id !== undefined ? row.id : `row-${rowIndex}`;
    setEditingRowId(rowKey);
    setEditedRowData({ ...row });
  };

  const onSave = () => {
    setIsSavingRowId(editingRowId);
    if (saveAction) {
      saveAction(editedRowData)
        .then((message) => {
          setMessages((prevMessages) => ({
            ...prevMessages,
            [editedRowData.id as string]: { message, type: "success" },
          }));
          setPrevTableData(tableData);

          // Update tableData with the editedRowData
          setTableData((prevData) =>
            prevData.map((row, index) => {
              const rowKey = row.id !== undefined ? row.id : `row-${index}`;
              if (rowKey === editingRowId) {
                return editedRowData;
              }
              return row;
            })
          );

          // Remove the message after 5 seconds
          setTimeout(() => {
            setMessages((prevMessages) => {
              const newMessages = { ...prevMessages };
              delete newMessages[editedRowData.id as string];
              return newMessages;
            });
          }, 5000);
        })
        .catch((error) => {
          setMessages((prevMessages) => ({
            ...prevMessages,
            [editedRowData.id as string]: {
              message: error.toString(),
              type: "error",
            },
          }));
          setTableData(prevTableData);

          // Remove the message after 5 seconds
          setTimeout(() => {
            setMessages((prevMessages) => {
              const newMessages = { ...prevMessages };
              delete newMessages[editedRowData.id as string];
              return newMessages;
            });
          }, 5000);
        })
        .finally(() => {
          setIsSavingRowId(null);
          setEditingRowId(null);
          setEditedRowData({});
        });
    } else {
      // If no saveAction provided, just update the tableData and reset editing state
      setTableData((prevData) =>
        prevData.map((row, index) => {
          const rowKey = row.id !== undefined ? row.id : `row-${index}`;
          if (rowKey === editingRowId) {
            return editedRowData;
          }
          return row;
        })
      );
      setIsSavingRowId(null);
      setEditingRowId(null);
      setEditedRowData({});
    }
  };

  return (
    <Table
      isCompact
      classNames={{
        base: "max-h-[calc(100vh-200px)] overflow-auto scrollbar-hide",
      }}
      aria-label="Custom Table"
      style={{ tableLayout: "fixed", width: "100%" }} // Added tableLayout fixed
    >
      <TableHeader>
        {modifiedColumns.map((col, index) => (
          <TableColumn
            key={`col-${index}`}
            style={{ width: `${100 / modifiedColumns.length}%` }} // Set equal widths
          >
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
                  <Skeleton
                    style={{ width: "100%", height: "1.5rem", borderRadius: "1rem" }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody>
          {tableData.map((row, rowIndex) => {
            const rowKey = row.id !== undefined ? row.id : `row-${rowIndex}`;
            return (
              <TableRow key={rowKey}>
                {modifiedColumns.map((col, colIndex) => {
                  let cellContent;

                  if (col.key === "actions") {
                    const actionButtons: React.ReactNode[] = [];

                    if (saveAction && editingRowId !== rowKey) {
                      actionButtons.push(
                        <Tooltip content="Edit" placement="left" key="edit">
                          <Chip
                            onClick={() => onEdit(row, rowIndex)}
                            isDisabled={isSavingRowId !== null}
                          >
                            <Image
                              as={NextImage}
                              src="/icons/edit.png"
                              width={15}
                              height={15}
                              alt="edit icon"
                              style={{ borderRadius: "0" }}
                            />
                          </Chip>
                        </Tooltip>
                      );
                    }

                    if (saveAction && editingRowId === rowKey) {
                      if (isSavingRowId === rowKey) {
                        actionButtons.push(
                          <Tooltip content="Saving..." placement="left" key="saving">
                            <Chip color="success" isDisabled>
                              <Spinner size="sm" />
                            </Chip>
                          </Tooltip>
                        );
                      } else {
                        actionButtons.push(
                          <Tooltip content="Save" placement="left" key="save">
                            <Chip
                              color="success"
                              onClick={onSave}
                              isDisabled={isSavingRowId !== null}
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
                        );
                      }
                    }

                    if (deleteAction) {
                      actionButtons.push(
                        <Tooltip content="Delete" placement="right" key="delete">
                          <Chip
                            color="danger"
                            onClick={() => deleteAction(row)}
                            isDisabled={isSavingRowId !== null}
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
                      );
                    }

                    // Display the message as a Tooltip
                    if (messages[row.id as string]) {
                      actionButtons.push(
                        <Tooltip
                          content={messages[row.id as string].message}
                          color={
                            messages[row.id as string].type === "error"
                              ? "danger"
                              : "success"
                          }
                          placement="right"
                          isOpen
                          key="message"
                        >
                          <span></span>
                        </Tooltip>
                      );
                    }

                    cellContent = (
                      <div
                        style={{ display: "flex", gap: "8px", alignItems: "center" }}
                      >
                        {actionButtons}
                      </div>
                    );
                  } else if (editingRowId === rowKey) {
                    cellContent = (
                      <input
                        type="text"
                        value={editedRowData[col.key]}
                        onChange={(e) =>
                          setEditedRowData({
                            ...editedRowData,
                            [col.key]: e.target.value,
                          })
                        }
                        style={{
                          width: "100%",
                          padding: "0.5rem",
                          borderRadius: "0.25rem",
                          border: "1px solid #ccc",
                          boxSizing: "border-box", // Ensure padding doesn't exceed cell width
                        }}
                        disabled={isSavingRowId !== null}
                      />
                    );
                  } else {
                    cellContent = (
                      <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                        {row[col.key]}
                      </div>
                    );
                  }

                  return (
                    <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                      {cellContent}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      )}
    </Table>
  );
};

export default CustomTable;
