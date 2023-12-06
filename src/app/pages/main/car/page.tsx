'use client';

import NavBar from "@/app/components/common/navBar/navBar";
import Table from "@/app/components/common/table/tableComponente";
import { ColumnTable } from "@/app/interfaces/model";

export default function Login() {
    const columns: ColumnTable[] = [
        { field: 'plate', name: "Placa" },
        { field: 'model', name: "Modelo" },
        { field: 'brand', name: "Marca" },
        { field: 'color', name: "Color" },
    ];

    const data = [
        {id: "1", plate: "XYZ-123", model: "Acme Motors", brand: "316304678", color: "Rojo metálico"},
        {id: "2", plate: "ABC-456", model: "Nebula Cruiser", brand: "Quantum Drive", color: "Azul eléctrico"},
        {id: "3", plate: "DEF-789", model: "Sonic Sprint", brand: "Velocity Motors", color: "Plateado brillante"},
        {id: "4", plate: "GHI-012", model: "FuturaX", brand: "TechAuto", color: "Negro mate"},
        {id: "5", plate: "JKL-345", model: "GreenLeaf", brand: "EcoRide", color: " Verde eco-amigable"},
    ]

    return (
        <>
            <NavBar></NavBar>
            <h1 style={{textAlign: 'center', fontSize: '50px'}}>Carros en el parqueadero</h1>
            <Table columns={columns} values={data}></Table> 
        </>  
    )
}