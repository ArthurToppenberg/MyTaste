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
  Tooltip
} from "@nextui-org/react";
import NextImage from "next/image";

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
                      <Tooltip content="Edit" placement="top">
                        <Chip onClick={() => editAction(row)}>
                        <Image
                          as={NextImage}
                          src='/icons/settings.png'
                          width={15}
                          height={15}
                          alt='settings icon'
                          style={{borderRadius: '0'}}
                        />
                        </Chip>
                      </Tooltip>
                      )}
                      {saveAction && (
                      <Tooltip content="Save" placement="top">
                        <Chip color="success" onClick={() => saveAction(row)}>
                        <Image
                          as={NextImage}
                          src='/icons/save.png'
                          width={15}
                          height={15}
                          alt='save icon'
                          style={{borderRadius: '0'}}
                        />
                        </Chip>
                      </Tooltip>
                      )}
                      {deleteAction && (
                      <Tooltip content="Delete" placement="top">
                        <Chip color="danger" onClick={() => deleteAction(row)}>
                        <Image
                          as={NextImage}
                          src='/icons/delete.png'
                          width={15}
                          height={15}
                          alt='delete icon'
                          style={{borderRadius: '0'}}
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
      </Table>
    </div>
  );
};

export default CustomTable;
