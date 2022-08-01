import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={ styles.navbar }>
      < NavLink to='/'>
        Mini <span className={ styles.brand }>Blog</span>
      </ NavLink>
      <ul className={ styles.links_list }>
        <li>
          < NavLink to='/' className={ ({ isActive }) =>  isActive ? styles.active : undefined  }>Home</ NavLink>
        </li>
        <li>
          < NavLink to='/login' className={ ({ isActive }) =>  isActive ? styles.active : undefined  }>Login</ NavLink>
        </li>
        <li>
          < NavLink to='/register' className={ ({ isActive }) =>  isActive ? styles.active : undefined  }>Cadastrar</ NavLink>
        </li>
        <li>
          < NavLink to='/about' className={ ({ isActive }) =>  isActive ? styles.active : undefined  }>About</ NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar