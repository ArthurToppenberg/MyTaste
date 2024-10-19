import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

interface TableProps {
  columns: { name: string; key: string }[];
  data: { [key: string]: string | number }[];
  editAction?: (row: { [key: string]: string | number }) => void;
  deleteAction?: (row: { [key: string]: string | number }) => void;
  saveAction?: (row: { [key: string]: string | number }) => void; // New save action prop
}

const CustomTable: React.FC<TableProps> = ({
  columns,
  data,
  editAction,
  deleteAction,
  saveAction, // New save action prop
}) => {
  // Add the actions column if editAction, deleteAction, or saveAction is provided
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
        overflow: "auto",
        borderRadius: "1rem",
      }}
    >
      <Table
        aria-label="Custom Table"
        style={{
          width: "100%",
          maxHeight: "calc(100vh - 200px)",
        }}
      >
        <TableHeader>
          {modifiedColumns.map((col, index) => (
            <TableColumn key={`col-${index}`} style={{ minWidth: "150px" }}>
              {col.name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={`row-${rowIndex}`}>
              {modifiedColumns.map((col, colIndex) => (
                <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                  {col.key === "actions" ? (
                    <div style={{ display: "flex", gap: "8px" }}>
                      {editAction && (
                        <Button size="sm" onClick={() => editAction(row)}>
                          Edit
                        </Button>
                      )}
                      {deleteAction && (
                        <Button size="sm" color="danger" onClick={() => deleteAction(row)}>
                          Delete
                        </Button>
                      )}
                      {saveAction && (
                        <Button size="sm" color="success" onClick={() => saveAction(row)}>
                          Save
                        </Button>
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
      </Table>
    </div>
  );
};

export default CustomTable;
