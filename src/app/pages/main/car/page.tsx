'use client';

import NavBar from "@/app/components/common/navBar/navBar";
import Table from "@/app/components/common/table/tableComponente";
import useCRUD from "@/app/hooks/common/useCRUD";
import { ColumnTable } from "@/app/interfaces/model";
import { Car } from "@/app/model/common/general";
import { useEffect, useState } from "react";

export default function Login() {
    const [data, setData] = useState<Car[]>([]);
    const {getAll} = useCRUD<Car>('car')


    const columns: ColumnTable[] = [
        { field: 'plate', name: "Placa" },
        { field: 'model', name: "Modelo" },
        { field: 'brand', name: "Marca" },
        { field: 'color', name: "Color" },
    ];

    useEffect(()=> {
        getAll({} as Car).then(res => {
            setData(res)
        })
    })
    return (
        <>
            <NavBar></NavBar>
            <h1 style={{textAlign: 'center', fontSize: '50px',  fontStyle: 'italic'}}>Carros en el parqueadero</h1>
            <Table<Car> columns={columns} values={data}  typeOfValue = {'car'}></Table> 
        </>  
    )
}