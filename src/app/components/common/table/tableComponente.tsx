import React, { useEffect, useState} from 'react';
import { DataTable, DataTableRowEditCompleteEvent, DataTableValue } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Swal from 'sweetalert2'
import { Dialog } from 'primereact/dialog';

import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import { TableProps } from '@/app/interfaces/model';
import useCRUD from "@/app/hooks/common/useCRUD";


export default function Table<T extends DataTableValue>(props: TableProps<T>) {
    const [data, setData] = useState<DataTableValue[]>([]);
    const [showInputs, setShowInputs] = useState(false);
    const [newItem, setNewItem] = useState<Partial<any>>({});
    const [editedRowIndex, setEditedRowIndex] = useState<number | null>(null);
    const {create, deleteData, update} = useCRUD<T>(props.typeOfValue)

    useEffect(() => {
        setData(props.values);
    }, [props.values]);

    const onRowEditInit = (e: DataTableRowEditCompleteEvent) => {
      setEditedRowIndex(e.index);
    };
  
    const onRowEditCancel = () => {
      setEditedRowIndex(null);
    };
    
    const textEditor = (options: any) => {
      return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback(e.target.value)} />;
    };

    const onRowEditComplete = async (e: DataTableRowEditCompleteEvent) => {
    
      try {
        const { newData: editedData, index } = e;
        const updatedData = [...data];
        updatedData[index] = editedData as T;
  
        await update(editedData as T); 
        setData(updatedData);
        setEditedRowIndex(null);
        Swal.fire('Editado', 'Los datos han sido editados con éxito.', 'success');
      } catch (error) {
        console.error('Error al editar el item:', error);
        Swal.fire('Error', 'Hubo un error al editar el item.', 'error');
      }
    };

    const deleteItem = async (itemId: string) => {
      const itemToDelete = data.find((item) => item.id === itemId);
  
      if (itemToDelete) {
          try {
              await deleteData(itemToDelete.id);
              const updatedData = data.filter((item) => item.id !== itemId);
              setData(updatedData);
              Swal.fire('Eliminado', 'Los datos han sido eliminados.', 'success');
          } catch (error) {
              console.error('Error al eliminar el item:', error);
              Swal.fire('Error', 'Hubo un error al eliminar el item.', 'error');
          }
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
    
      const saveNewItem = async () => {
        if (Object.keys(newItem).length > 0) {
          try {
            const createdItem = await create(newItem as T);
            setData([...data, createdItem]);
            setShowInputs(false);
            setNewItem({});
            Swal.fire('Agregado', 'Nuevo ítem agregado con éxito.', 'success');
        } catch (error) {
            // Manejo de errores, por ejemplo:
            console.error('Error al agregar el nuevo ítem:', error);
            Swal.fire('Error', 'Hubo un error al agregar el nuevo ítem.', 'error');
        }
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
          <DataTable value={data} editMode="row" dataKey="id" tableStyle={{ minWidth: '50rem', border: '1px solid #ddd' }} style={{ margin: '5%' }} onRowEditInit={onRowEditInit} onRowEditCancel={onRowEditCancel} onRowEditComplete={onRowEditComplete}>
            {tableColumns()}
            <Column header="Eliminar" body={(rowData) => deleteButton(rowData)} headerStyle={{ width: '10%', minWidth: '8rem', fontWeight: 'bold' }}></Column>
          </DataTable>
        <div>
          {showInputs ? (
            <Dialog header="Agregar Nuevo Item" visible={showInputs} style={{ width: '400px' }} onHide={() => setShowInputs(false)}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {renderInputFields()}
                </div>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                  <button
                    className="p-button p-button-success"
                    onClick={saveNewItem}
                    style={{ width: '100px', marginRight: '10px', fontSize: '14px', backgroundColor: '#5dc1b9 ' }}
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
              style={{ display: 'block', margin: 'auto', backgroundColor: '#800080' }}
              onClick={addNewItem}
            >
              Agregar
            </button>
          )}
      </div>
        </>
      );
      
}
