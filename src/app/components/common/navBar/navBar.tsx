import { useNavigationContext } from '@/app/providers/common/navigationProvider';
import { Menubar } from 'primereact/menubar';
export default function NavBar(){
  const {goToRoute}= useNavigationContext()
    const items = [
        {
          label: 'Clientes',
          icon: 'pi pi-fw pi-users',
          command: () => { goToRoute('/pages/main/client') ; } 
        },
        {
          label: 'Carros',
          icon: 'pi pi-fw pi-car',
          command: () => { goToRoute('/pages/main/car'); } 
        },
        {
          label: 'Servicios',
          icon: 'pi pi-fw pi-cog', 
          items:[
            {
                label: 'Lavado',
                icon: 'pi pi-fw pi-sun',
                command: () => {  } 
            },
            {
                label: 'Cafeteria',
                icon: 'pi pi-fw pi-cart-plus',
                command: () => {  } 
            },
            {
                label: 'Mecanica',
                icon: 'pi pi-fw pi-car',
                command: () => {  } 
            },
          ]
        }
      ];
      const start = <img alt="logo" src="logo.png" height="40" className="p-mr-2" />;
      return(
        <Menubar model={items} start={start} />
      )
}