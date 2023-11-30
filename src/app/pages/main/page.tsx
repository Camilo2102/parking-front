'use client';

import Table from "@/app/components/common/table/tableComponente";
import { ColumnTable } from "@/app/interfaces/model";

export default function Login() {
    const columns: ColumnTable[] = [
        { field: 'name', name: "Nombre" },
    ];

    const data = [
        {name: "hola"},
        {name: "hola"},
        {name: "hola"},
        {name: "hola"},
    ]

    return (
        <Table columns={columns} values={data}></Table>     
    )
}