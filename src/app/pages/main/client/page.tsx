'use client';

import NavBar from "@/app/components/common/navBar/navBar";
import Table from "@/app/components/common/table/tableComponente";
import { ColumnTable } from "@/app/interfaces/model";

export default function Login() {
    const columns: ColumnTable[] = [
        { field: 'name', name: "Nombre" },
        { field: 'address', name: "Dirección" },
        { field: 'number', name: "Número" },
    ];

    const data = [
        {id: "1", name: "Jazmin", address: "Cra 10 # 10-78", number: "316304678"},
        {id: "2", name: "Andrea", address: "Cra 14 # 10-78", number: "3163484678"},
        {id: "3", name: "Camilo",  address: "Cra 13 # 10-78", number: "398304678"},
        {id: "4", name: "Juan Esteban",  address: "Cra 17 # 10-78", number: "312204678"},
    ]
    //*Tocxa cambiar el typeOfValue por client
    return (
        <>
            <NavBar></NavBar>
            <h1 style={{textAlign: 'center', fontSize: '50px'}}>Clientes</h1>
            <Table columns={columns} values={data} typeOfValue = {'client'}></Table> 
        </>  
    )
}