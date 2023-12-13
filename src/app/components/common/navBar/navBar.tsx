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
        }
      ];
      const start = <img alt="logo" src="/logo.jpg" height="40" className="p-mr-2" style={{borderRadius: '10px'}}/>;
      return(
        <Menubar model={items} start={start} />
      )
}