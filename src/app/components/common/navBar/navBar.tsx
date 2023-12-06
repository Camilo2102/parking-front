import { Menubar } from 'primereact/menubar';
export default function NavBar(){
    const items = [
        {
          label: 'Clientes',
          icon: 'pi pi-fw pi-users',
          command: () => { window.location.href = '/pages/main/client'; } 
        },
        {
          label: 'Carros',
          icon: 'pi pi-fw pi-car',
          command: () => { window.location.href = '/pages/main/car'; } 
        },
        {
          label: 'Servicios',
          icon: 'pi pi-fw pi-cog', 
          items:[
            {
                label: 'Lavado',
                icon: 'pi pi-fw pi-sun',
                command: () => { window.location.href = '#'; } 
            },
            {
                label: 'Cafeteria',
                icon: 'pi pi-fw pi-cart-plus',
                command: () => { window.location.href = '#'; } 
            },
            {
                label: 'Mecanica',
                icon: 'pi pi-fw pi-car',
                command: () => { window.location.href = '#'; } 
            },
          ]
        }
      ];
      const start = <img alt="logo" src="logo.png" height="40" className="p-mr-2" />;
      return(
        <Menubar model={items} start={start} />
      )
}