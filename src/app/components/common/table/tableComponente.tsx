import React, { useEffect, useState} from 'react';
import { DataTable, DataTableRowEditCompleteEvent, DataTableValue } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Swal from 'sweetalert2'
import { Dialog } from 'primereact/dialog';

import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import { TableProps } from '@/app/interfaces/model';


export default function Table(props: TableProps) {
    const [data, setData] = useState<DataTableValue[]>([]);
    const [showInputs, setShowInputs] = useState(false);
    const [newItem, setNewItem] = useState<Partial<any>>({});

    useEffect(() => {
        setData(props.values);
    }, [props.values]);

    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        let newData = [...data];
        let { newData: editedData, index } = e;

        newData[index] = editedData as DataTableValue;
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

    const deleteButton = (rowData: DataTableValue) => (
        <button className="p-button p-button-danger p-button-icon-only" onClick={() => deleteItem(rowData.id)}>
            <i className="pi pi-trash"></i>
        </button>
    );

    const addNewItem = () => {
        setShowInputs(true);
      };
    
      const saveNewItem = () => {
        if (Object.keys(newItem).length > 0) {
          setData([...data, newItem as DataTableValue]);
          setShowInputs(false);
          setNewItem({});
          Swal.fire('Agregado', 'Nuevo ítem agregado con éxito.', 'success');
        } else {
          Swal.fire('Error', 'Por favor, completa al menos un campo.', 'error');
        }
      };
    
      const cancelAddNewItem = () => {
        setShowInputs(false);
        setNewItem({});
      };
      const renderInputFields = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {props.columns.map((column, index) => (
              <div key={`input-${index}`} style={{ marginBottom: '10px', marginTop: '10px' }}>
                <span className="p-float-label">
                  <InputText id="username" value={newItem[column.field] || ''} onChange={(e) => setNewItem({ ...newItem, [column.field]: e.target.value })} />
                  <label htmlFor="username">{column.name}</label>
                </span>
              </div>
            ))}
          </div>
        );
      };
      return (
        <>
          <DataTable value={data} editMode="row" dataKey="id" tableStyle={{ minWidth: '50rem', border: '1px solid #ddd' }} style={{ margin: '5%' }} onRowEditComplete={onRowEditComplete}>
            {tableColumns()}
            <Column header="Editar" rowEditor headerStyle={{ width: '10%', minWidth: '8rem', fontWeight: 'bold' }}></Column>
            <Column header="Eliminar" body={(rowData) => deleteButton(rowData)} headerStyle={{ width: '10%', minWidth: '8rem', fontWeight: 'bold' }}></Column>
          </DataTable>
      
        <div>
          {showInputs ? (
            <Dialog
              header="Agregar Nuevo Item"
              visible={showInputs}
              style={{ width: '400px' }}
              onHide={() => setShowInputs(false)}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {renderInputFields()}
                </div>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                  <button
                    className="p-button p-button-success"
                    onClick={saveNewItem}
                    style={{ width: '100px', marginRight: '10px', fontSize: '14px', backgroundColor: '#1E6FB7' }}
                  >
                    Guardar
                  </button>
                  <button
                    className="p-button p-button-secondary"
                    onClick={cancelAddNewItem}
                    style={{ width: '100px', fontSize: '14px' }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </Dialog>
          ) : (
            <button
              className="p-button p-button-success"
              style={{ display: 'block', margin: 'auto', backgroundColor: '#1E6FB7' }}
              onClick={addNewItem}
            >
              Agregar
            </button>
          )}
      </div>
        </>
      );
      
}
