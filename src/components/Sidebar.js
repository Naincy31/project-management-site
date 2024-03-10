import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import { useAuthContext } from '../hooks/useAuthContext'
import Avatar from './Avatar'

//styles
import './Sidebar.css'

const Sidebar = () => {
    const { user } = useAuthContext()

  return (
    <div className='sidebar'>
        <div className='sidebar-content'>
            <div className='user'>
                <Avatar src={user.photoURL}/>
                <p>Hey {user.displayName}</p>
            </div>
            <nav className='links'>
                <ul>
                    <li>
                        <NavLink exact to='/'>
                            <img src={DashboardIcon} alt='dashboard-icon'/>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/create'>
                            <img src={AddIcon} alt='create-project-icon'/>
                            <span>New Project</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default Sidebar