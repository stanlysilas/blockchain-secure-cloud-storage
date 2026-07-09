import { NavLink } from 'react-router-dom'

import {
  ShieldCheck,
  LayoutDashboard,
  Upload,
  Share2,
  Home,
  User
} from 'lucide-react'

import WalletButton from './WalletButton'

function Navbar () {
  const navStyle = ({ isActive }) =>
    isActive ? 'navbar-link navbar-link-active' : 'navbar-link'

  return (
    <div className='navbar-wrapper'>
      <nav className='navbar-shell'>
        <div className='navbar-content'>
          <div className='navbar-brand'>
            <div className='navbar-logo'>
              <ShieldCheck className='w-6 h-6 text-blue-400' />
            </div>

            <div>
              <h1 className='navbar-title'>BlockDrive</h1>

              <p className='navbar-subtitle'>Secure Decentralized Storage</p>
            </div>
          </div>

          <div className='navbar-right'>
            <div className='navbar-links'>
              <NavLink to='/' className={navStyle}>
                <div className='flex items-center gap-2'>
                  <Home className='w-4 h-4' />
                  Home
                </div>
              </NavLink>

              <NavLink to='/dashboard' className={navStyle}>
                <div className='flex items-center gap-2'>
                  <LayoutDashboard className='w-4 h-4' />
                  Dashboard
                </div>
              </NavLink>

              <NavLink to='/upload' className={navStyle}>
                <div className='flex items-center gap-2'>
                  <Upload className='w-4 h-4' />
                  Upload
                </div>
              </NavLink>

              <NavLink to='/shared' className={navStyle}>
                <div className='flex items-center gap-2'>
                  <Share2 className='w-4 h-4' />
                  Shared
                </div>
              </NavLink>

              <NavLink to='/profile' className={navStyle}>
                <div className='flex items-center gap-2'>
                  <User className='w-4 h-4' />
                  Profile
                </div>
              </NavLink>
            </div>

            <WalletButton />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
