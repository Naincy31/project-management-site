import { useState } from 'react'

//styles
import './Signup.css'

const Signup = () => {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)

    const handleFileChange = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0]
        console.log(selected);

        if (!selected) {
            setThumbnailError('Please select a file')
            return
        }
        if (!selected.type.includes('image')) {
            setThumbnailError('Selected file must be an image')
            return
        }
        if (selected.size > 100000) {
            setThumbnailError('Image file size must be less then 100KB')
            return
        }

        setThumbnailError(null)
        setThumbnail(selected)
        console.log('Thumbnail updated');

    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(displayName, email,password, thumbnail);
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
            <span>Profile Thumbnail:</span>
            <input 
                type='file'
                onChange={handleFileChange}
                required
            />
            {thumbnailError && <div className='error'>{thumbnailError}</div>}
        </label>
        <button className='btn'>Sign up</button>
    </form>
  )
}

export default Signup