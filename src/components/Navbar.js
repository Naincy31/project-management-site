import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import useLogout from '../hooks/useLogout'

//styles
import './Navbar.css'
import Temple from '../assets/temple.svg'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout, error, isPending } = useLogout()
    const { user } = useAuthContext()

  return (
    <div className='navbar'>
        <ul>
            <li className='logo'>
                <img src={Temple} alt='temple-logo'/>
                <span>Project Management</span>
            </li>
            {!user && (
                <>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/signup'>Signup</Link></li>
                </>
            )}
            {user && (
                <li>
                    {!isPending && <button className='btn' onClick={logout}>Logout</button>}
                    {isPending && <button className='btn' disabled>Logging out...</button>}
                </li>
            )}
            
        </ul>
    </div>
  )
}

export default Navbar