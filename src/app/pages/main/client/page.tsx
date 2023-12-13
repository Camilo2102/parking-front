'use client';

import NavBar from "@/app/components/common/navBar/navBar";
import Table from "@/app/components/common/table/tableComponente";
import useCRUD from "@/app/hooks/common/useCRUD";
import { Client } from "@/app/model/common/general";
import { ColumnTable } from "@/app/interfaces/model";
import { useEffect, useState } from "react";

export default function Login() {
    const [data, setData] = useState<Client[]>([]);
    const {getAll} = useCRUD<Client>('client')

    const columns: ColumnTable[] = [
        { field: 'name', name: "Nombre" },
        { field: 'lastName', name: "Apellido" },
        { field: 'address', name: "Dirección" },
        { field: 'phone', name: "Número" },
    ];

    useEffect(()=> {
        getAll({} as Client).then(res => {
            setData(res)
        })
    })
   
    return (
        <>
            <NavBar></NavBar>
            <h1 style={{textAlign: 'center', fontSize: '50px', fontStyle: 'italic'}}>Clientes</h1>
            <Table columns={columns} values={data} typeOfValue = {'client'}></Table> 
        </>  
    )
}