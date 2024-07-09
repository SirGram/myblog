
import { Link } from 'react-router-dom'
import {ModeToggle} from './mode-toggle'
import { Button } from './ui/button'
import { useAuth } from '@/context/AuthContext'

export default function Nav({visible}:{visible:boolean}) {
    
  const {isAuthenticated} = useAuth()
    return(
        <nav className={`p-4 z-30  border-b-4  w-full flex items-center justify-center transition-all duration-1000 bg-background  sticky ${visible ? 'top-0' : '-top-20'}`}>
            <span className="w-full flex text-center justify-center ">
            <Link to="/home" className='flex'>
            <h1 className=" font-futuristic">MyBlog</h1>
            <h2 className='pt-3 ml-1 text-accent font-bold'>{isAuthenticated ? "ADMIN": "USER"}</h2>
            </Link>
            </span>
            <span className='flex gap-2'>
                {isAuthenticated && 
                <Link to="/admin">
                <Button variant="outline">ADMIN</Button>
                </Link>}
            <ModeToggle/></span>
        </nav>        
    )    
}