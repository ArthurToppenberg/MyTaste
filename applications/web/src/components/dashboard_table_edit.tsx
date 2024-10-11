import React from "react";

export enum TableCollumnType {
    STRING,
    NUMBER
}

export interface ITableCollumn {
    name: string;
    type: TableCollumnType;
}


// interface TableEditStringProps {

// }

// export const TableEditString: React.FC<TableEditStringProps> = (props) => {
//     return (
//         <p> Hello World </p>
//     );
// };