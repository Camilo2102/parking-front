import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TableProps } from '@/app/interfaces/model';


export default function Table(props: TableProps) {
    const tableColumns = ()=>{
        return props.columns.map((column, index) =>
            <Column key={"column-" + index} field={column.field} header={column.name} style={{ width: '20%' }}></Column>
        )
        
    }
    return (
            <DataTable value={props.values} editMode="row" dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                {tableColumns()}
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable>
    )
}