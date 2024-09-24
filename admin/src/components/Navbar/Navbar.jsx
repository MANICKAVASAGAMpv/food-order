import React from 'react'
import './Navbar.css'
import { assets } from '../../admin_assets/assets'

const Navbar = () => {
  return (
    <div className='Navbar'>
        <img src={assets.logo}alt="" className='logo' />
        <img src={assets.profile_image} alt="" className='profile' />
    </div>
  )
}

export default Navbar