import { DataTableValue } from "primereact/datatable";

export interface ColumnTable{
    field: string;
    name: string;
}

export interface TableProps{
    columns: ColumnTable[];
    values: DataTableValue[];
}