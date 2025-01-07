import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const MobilenavLink = () => {
    return (
        <div className='flex flex-col gap-4 items-center w-full'>
            <Link to="/user-profile" className='font-bold text-black text-base'>Profile</Link>
            <Button>Logout</Button>

        </div>
    )
}

export default MobilenavLink