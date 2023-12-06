import { DataTableValue } from "primereact/datatable";

export interface ColumnTable{
    field: string;
    name: string;
}

export interface Paginator{
    rows: number;
    page: number;
    totalRecords: number;
    first: number;
    pagesVisited: number;
    loaded: boolean;
}

export interface TableProps{
    columns: ColumnTable[];
    values: DataTableValue[];
}