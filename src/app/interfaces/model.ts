import { DataTableValue } from "primereact/datatable";
import { Car } from "@/app/model/common/general";
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

export interface TableProps<T>{
    columns: ColumnTable[];
    values: DataTableValue[];
    typeOfValue: string
}