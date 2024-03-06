import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

//styles
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='sidebar-content'>
            <div className='user'>
                {/* avatar and username here later*/}
                <p>Hey User</p>
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