import React, { useEffect, useState } from 'react';
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Swal from 'sweetalert2'

import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';

interface TableItem {
    id: string;
    [key: string]: string;
}

interface TableProps<T> {
    values: T[];
    columns: { field: string; name: string }[];
}

export default function Table<T extends TableItem>(props: TableProps<T>) {
    const [data, setData] = useState<T[]>([]);

    useEffect(() => {
        setData(props.values);
    }, [props.values]);

    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        let newData = [...data];
        let { newData: editedData, index } = e;

        newData[index] = editedData as T;
        setData(newData);
        Swal.fire('Editado', 'Los datos han sido editados con éxito.', 'success');
    };

    const textEditor = (options: any) => {
        return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback(e.target.value)} />;
    };

    const deleteItem = (itemId: string) => {
        const itemToDelete = data.find((item) => item.id === itemId);

        if (itemToDelete) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: '¡No podrás revertir esto!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    const updatedData = data.filter((item) => item.id !== itemId);
                    setData(updatedData);
    
                    Swal.fire('Eliminado', 'Los datos han sido eliminados.', 'success');
                }
            });
        }
    };

    const tableColumns = () => {
        return props.columns.map((column, index) => (
            <Column
                key={"column-" + index}
                field={column.field}
                header={column.name}
                style={{ width: '20%' }}
                headerStyle={{ fontWeight: 'bold' }}
                editor={(options) => textEditor(options)}
            />
        ));
    };

    const deleteButton = (rowData: T) => (
        <button className="p-button p-button-danger p-button-icon-only" onClick={() => deleteItem(rowData.id)}>
            <i className="pi pi-trash"></i>
        </button>
    );

    return (
        <DataTable value={data} editMode="row" dataKey="id" tableStyle={{ minWidth: '50rem', border: '1px solid #ddd' }} style={{ margin: '5%' }} onRowEditComplete={onRowEditComplete}>
            {tableColumns()}
            <Column header="Editar" rowEditor headerStyle={{ width: '10%', minWidth: '8rem', fontWeight: 'bold' }}></Column>
            <Column header="Eliminar" body={(rowData) => deleteButton(rowData)} headerStyle={{ width: '10%', minWidth: '8rem', fontWeight: 'bold' }}></Column>
        </DataTable>
    );
}
