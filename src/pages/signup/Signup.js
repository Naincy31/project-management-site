import { useState } from 'react'
import useSignup from '../../hooks/useSignup'

//styles
import './Signup.css'

const Signup = () => {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [avatarError, setAvatarError] = useState(null)
    const { signup, error, isPending } = useSignup()

    const handleFileChange = (e) => {
        setAvatar(null)
        let selected = e.target.files[0]
        console.log(selected);

        if (!selected) {
            setAvatarError('Please select a file')
            return
        }
        if (!selected.type.includes('image')) {
            setAvatarError('Selected file must be an image')
            return
        }
        if (selected.size > 100000) {
            setAvatarError('Image file size must be less then 100KB')
            return
        }

        setAvatarError(null)
        setAvatar(selected)
        console.log('Avatar updated');

    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(displayName, email,password, avatar);
        signup(email, password, displayName, avatar);
    }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <label>
            <span>Name:</span>
            <input 
                type='text'
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
                required
            />
        </label>
        <label>
            <span>Email:</span>
            <input 
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />
        </label>
        <label>
            <span>Password:</span>
            <input 
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
            />
        </label>
        <label>
            <span>Profile Avatar:</span>
            <input 
                type='file'
                onChange={handleFileChange}
                required
            />
            {avatarError && <div className='error'>{avatarError}</div>}
        </label>
        {isPending ? <button className='btn' disabled>Loading...</button> : <button className='btn'>Sign up</button>}
        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Signup